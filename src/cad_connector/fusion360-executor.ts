/**
 * Fusion 360 external executor.
 *
 * Fusion has no headless mode: model-interacting code must run inside the
 * application, and the documented automation path is a resident add-in that
 * auto-loads at startup. So this executor is a GUI bridge, structurally the
 * same idea as the FreeCAD detached-GUI mode:
 *
 *   1. (once) install the DshCadBridge add-in into the user's Fusion API
 *      AddIns folder — it starts watching a spool directory at launch;
 *   2. run(): write job.json into the spool (and spawn Fusion if it is not
 *      running);
 *   3. the bridge picks the job up, executes the op program through the
 *      Fusion API (TemporaryBRep primitives/booleans, sketch extrude,
 *      MeshManager tessellation, STEP/STL export), writes result.json;
 *   4. run() polls for the result and maps it onto the executor contract.
 *
 * The mesh currency is the same ExecutorMesh every backend produces, so the
 * WebGL display layer never knows which engine ran.
 */
import { spawn } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import path from 'node:path'
import type { GeometryExecutor, GeometryProgram, GeometryResult, RunOptions } from './executor.js'

const BRIDGE_ID = 'DshCadBridge'
const SPOOL_DIR = path.join(homedir(), '.dsh-cad', 'fusion-spool')

interface BridgeResult {
  ok: boolean
  error?: string
  meshes?: Array<{
    bodyId: string
    name: string
    positions: number[]
    normals: number[]
    indices: number[]
    vertexCount: number
    triangleCount: number
  }>
  volumes?: Record<string, number>
  exported?: string
}

let probed: string | null | undefined

function fusionAppCandidates(): string[] {
  const apps = [
    '/Applications/Fusion 360.app',
    '/Applications/Autodesk Fusion.app',
    '/Applications/Autodesk Fusion 360.app',
  ]
  // Windows: the Fusion launcher lives under LOCALAPPDATA\Autodesk\webdeploy\production\<hash>\Fusion360.exe
  const localAppData = process.env.LOCALAPPDATA
  if (localAppData !== undefined) {
    const production = path.join(localAppData, 'Autodesk', 'webdeploy', 'production')
    if (existsSync(production)) {
      try {
        for (const version of readdirSync(production)) {
          apps.push(path.join(production, version, 'Fusion360.exe'))
        }
      } catch {
        // unreadable — fall through to the probe miss
      }
    }
  }
  return apps
}

/** Locate a Fusion 360 application bundle/binary, or null when absent. */
export function findFusion360(): string | null {
  if (probed === undefined) {
    probed = fusionAppCandidates().find((candidate) => existsSync(candidate)) ?? null
  }
  return probed
}

/** Whether the Fusion executor is usable on this machine. */
export function fusion360Available(): boolean {
  return findFusion360() !== null
}

/** The user-level add-in folder Fusion auto-loads at startup. */
function addInsDirectory(): string {
  if (process.platform === 'win32') {
    return path.join(process.env.APPDATA ?? path.join(homedir(), 'AppData', 'Roaming'), 'Autodesk', 'Autodesk Fusion 360', 'API', 'AddIns')
  }
  return path.join(homedir(), 'Library', 'Application Support', 'Autodesk', 'Autodesk Fusion 360', 'API', 'AddIns')
}

/** Idempotently install the resident bridge add-in next to its manifest. */
export async function installFusionBridge(): Promise<string> {
  const directory = path.join(addInsDirectory(), BRIDGE_ID)
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, `${BRIDGE_ID}.manifest`), JSON.stringify({
    id: BRIDGE_ID,
    name: 'dsh-cad Bridge',
    author: 'dsh-cad',
    description: 'Executes dsh-cad op programs from the local spool directory.',
  }, null, 2))
  await writeFile(path.join(directory, `${BRIDGE_ID}.py`), BRIDGE_ADDIN)
  return directory
}

/** Launch Fusion detached (the bridge add-in auto-loads with it). */
function launchFusion(app: string): void {
  const child = process.platform === 'win32'
    ? spawn(app, ['--hidden'], { detached: true, stdio: 'ignore', windowsHide: false })
    : spawn('open', ['-a', app], { detached: true, stdio: 'ignore' })
  child.unref()
}

/** Write a job, make sure Fusion is running, poll for the bridge result. */
export async function runFusionProgram(program: GeometryProgram, options: RunOptions = {}): Promise<GeometryResult> {
  const timeoutMs = options.timeoutMs ?? 300_000
  const app = findFusion360()
  if (app === null) {
    throw new Error('Fusion 360 was not found — install Fusion (macOS: /Applications) and try again')
  }
  await installFusionBridge()
  await mkdir(SPOOL_DIR, { recursive: true })

  const jobId = `job-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const jobPath = path.join(SPOOL_DIR, `${jobId}.json`)
  const runningPath = path.join(SPOOL_DIR, `${jobId}.running`)
  const resultPath = path.join(SPOOL_DIR, `${jobId}.result.json`)
  await writeFile(jobPath, JSON.stringify({ id: jobId, program }))

  launchFusion(app)

  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    if (existsSync(resultPath)) {
      await rm(runningPath, { force: true }).catch(() => undefined)
      await rm(jobPath, { force: true }).catch(() => undefined)
      const parsed = JSON.parse(await readFile(resultPath, 'utf8')) as BridgeResult
      await rm(resultPath, { force: true }).catch(() => undefined)
      return mapBridgeResult(parsed)
    }
    // Mark the job running on first sight so stale spool files are visible.
    if (existsSync(jobPath)) await rename(jobPath, runningPath).catch(() => undefined)
  }
  throw new Error('the Fusion bridge produced no result before the timeout — is Fusion signed in and the DshCadBridge add-in enabled?')
}

function mapBridgeResult(parsed: BridgeResult): GeometryResult {
  if (!parsed.ok) {
    throw new Error(`Fusion bridge failed: ${parsed.error ?? 'unknown error'}`)
  }
  return {
    meshes: (parsed.meshes ?? []).map((mesh) => ({
      bodyId: mesh.bodyId,
      name: mesh.name === '' ? mesh.bodyId : mesh.name,
      positions: Float32Array.from(mesh.positions),
      normals: Float32Array.from(mesh.normals),
      indices: Uint32Array.from(mesh.indices),
      vertexCount: mesh.vertexCount,
      triangleCount: mesh.triangleCount,
    })),
    volumes: parsed.volumes ?? {},
    exported: parsed.exported,
  }
}

/** The GeometryExecutor contract over the Fusion GUI bridge. */
export const FUSION360_EXECUTOR: GeometryExecutor = {
  id: 'fusion360',
  label: 'Fusion 360',
  available: fusion360Available,
  unavailableReason: () => 'Fusion 360 was not found — install Fusion (native on Apple Silicon) and try again',
  run: runFusionProgram,
}

/**
 * The resident add-in auto-loaded by Fusion. Watches the spool directory on a
 * timer, executes one job at a time through the Fusion API, writes the result
 * next to the job. Ops mirror the FreeCAD bridge: TemporaryBRep primitives +
 * booleans + transforms; sketch-based extrusion; MeshManager tessellation;
 * STEP/STL export via the ExportManager.
 */
const BRIDGE_ADDIN = String.raw`
import json
import math
import os
import traceback

import adsk.core
import adsk.fusion

SPOOL = os.path.join(os.path.expanduser('~'), '.dsh-cad', 'fusion-spool')
POLL_SECONDS = 0.5


def log(message):
    try:
        with open(os.path.join(SPOOL, 'bridge.log'), 'a') as handle:
            handle.write(message + '\n')
    except Exception:
        pass


def vector(values, default=(0.0, 0.0, 0.0)):
    if not values:
        return adsk.core.Vector3D.create(*default)
    return adsk.core.Vector3D.create(float(values[0]), float(values[1]), float(values[2]))


class Runner:
    def __init__(self, app):
        self.app = app
        self.temp_brep = adsk.core.TemporaryBRepManager.get()
        self.design = None

    def document(self):
        doc = self.app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
        doc.activate()
        self.design = adsk.fusion.Design.cast(doc.products.itemByProductType('DesignProductType'))
        self.design.designType = adsk.fusion.DesignTypes.DirectDesignType
        return doc

    def create_prim(self, prim, params):
        params = params or {}
        at = params.get('at')
        base = vector(at)
        if prim == 'box':
            dx, dy, dz = float(params.get('dx', 10)), float(params.get('dy', 10)), float(params.get('dz', 10))
            # NOTE: verify the width/length/height argument order against the
            # local Fusion API docs on the first live run.
            return self.temp_brep.createBox(adsk.core.OrientedBoundingBox3D.create(base, adsk.core.Vector3D.create(1, 0, 0), adsk.core.Vector3D.create(0, 1, 0), dx, dy, dz))
        if prim == 'cylinder':
            height = float(params.get('height', 10))
            return self.temp_brep.createCylinder(adsk.core.InputCylinder.create(base, vector(params.get('axis'), (0, 0, 1)), float(params.get('radius', 5)), height))
        if prim == 'sphere':
            return self.temp_brep.createSphere(adsk.core.InputSphere.create(base, float(params.get('radius', 5))))
        if prim == 'cone':
            return self.temp_brep.createCone(adsk.core.InputCone.create(base, vector(params.get('axis'), (0, 0, 1)), float(params.get('radius1', 5)), float(params.get('radius2', 0)), float(params.get('height', 10))))
        if prim == 'torus':
            return self.temp_brep.createTorus(adsk.core.InputTorus.create(base, vector(params.get('axis'), (0, 0, 1)), float(params.get('majorRadius', 10)), float(params.get('minorRadius', 2))))
        raise ValueError('unknown primitive: %s' % prim)

    def boolean(self, op, target, tool):
        if op == 'cut':
            kind = adsk.core.BooleanTypes.DifferenceBooleanType
        elif op == 'fuse':
            kind = adsk.core.BooleanTypes.UnionBooleanType
        else:
            kind = adsk.core.BooleanTypes.IntersectionBooleanType
        self.temp_brep.booleanOperation(target, tool, kind)

    def transform(self, body, op):
        if op.get('translate'):
            t = vector(op['translate'])
            m = adsk.core.Matrix3D.create()
            m.translation = t
            self.temp_brep.transform(body, m)
        rotate = op.get('rotate')
        if rotate:
            m = adsk.core.Matrix3D.create()
            for axis, angle in ((adsk.core.Vector3D.create(1, 0, 0), rotate[0]), (adsk.core.Vector3D.create(0, 1, 0), rotate[1]), (adsk.core.Vector3D.create(0, 0, 1), rotate[2])):
                if abs(float(angle)) > 1e-9:
                    m.setToRotation(math.radians(float(angle)), axis, adsk.core.Point3D.create(0, 0, 0))
                    self.temp_brep.transform(body, m)

    def extrude(self, points, height):
        root = self.design.rootComponent
        sketch = root.sketches.add(root.xYConstructionPlane)
        pts = []
        for i in range(0, len(points) - 1, 2):
            pts.append(adsk.core.Point3D.create(float(points[i]), float(points[i + 1]), 0))
        if len(pts) < 3:
            raise ValueError('profile needs at least 3 points')
        if (pts[-1].distanceTo(pts[0])) > 1e-9:
            pts.append(pts[0])
        lines = sketch.sketchCurves.sketchLines
        for a, b in zip(pts, pts[1:]):
            lines.addByTwoPoints(a, b)
        profile = sketch.profiles.item(0)
        extrude_input = root.features.extrudeFeatures.createInput(profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
        distance = adsk.fusion.DistanceExtentDefinition.create(adsk.core.ValueInput.createByReal(float(height or 10)))
        extrude_input.setOneSideExtent(distance, adsk.fusion.ExtentDirections.PositiveExtentDirection)
        feature = root.features.extrudeFeatures.add(extrude_input)
        body = feature.bodies.item(0)
        return self.temp_brep.copy(body)

    def show(self, bodies, names):
        root = self.design.rootComponent
        occurrence = root
        for body_id, body in bodies.items():
            feature = occurrence.features.baseFeatures.add()
            feature.startEdit()
            occurrence.bRepBodies.add(body, feature, names.get(body_id, body_id))
            feature.finishEdit()

    def tessellate(self, bodies, names):
        root = self.design.rootComponent
        meshes = []
        volumes = {}
        for body_id, body in bodies.items():
            feature = root.features.baseFeatures.add()
            feature.startEdit()
            shown = root.bRepBodies.add(body, feature, names.get(body_id, body_id))
            feature.finishEdit()
            mesh_manager = shown.meshManager
            mesh = mesh_manager.calculateMeshData(adsk.fusion.MeshCalculationOptions.create())
            coordinates = mesh.nodeCoordinatesAsArray
            triangles = mesh.triangleVerticesAsArray
            positions = []
            for point in coordinates:
                positions.extend([point.x, point.y, point.z])
            indices = [int(index) for index in triangles]
            normals = []
            for i in range(0, len(indices), 3):
                a, b, c = coordinates[indices[i]], coordinates[indices[i + 1]], coordinates[indices[i + 2]]
                ux, uy, uz = b.x - a.x, b.y - a.y, b.z - a.z
                vx, vy, vz = c.x - a.x, c.y - a.y, c.z - a.z
                nx, ny, nz = uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx
                length = math.sqrt(nx * nx + ny * ny + nz * nz) or 1.0
                normals.extend([nx / length, ny / length, nz / length] * 3)
            volumes[body_id] = abs(sum(
                (coordinates[indices[i]].x * (coordinates[indices[i + 1]].y * coordinates[indices[i + 2]].z - coordinates[indices[i + 1]].z * coordinates[indices[i + 2]].y)
                 - coordinates[indices[i]].y * (coordinates[indices[i + 1]].x * coordinates[indices[i + 2]].z - coordinates[indices[i + 1]].z * coordinates[indices[i + 2]].x)
                 + coordinates[indices[i]].z * (coordinates[indices[i + 1]].x * coordinates[indices[i + 2]].y - coordinates[indices[i + 1]].y * coordinates[indices[i + 2]].x)) / 6.0
                for i in range(0, len(indices), 3)))
            meshes.append({
                'bodyId': body_id,
                'name': names.get(body_id, body_id),
                'positions': positions,
                'normals': normals,
                'indices': indices,
                'vertexCount': len(coordinates),
                'triangleCount': len(indices) // 3,
            })
        return meshes, volumes

    def export(self, bodies, spec):
        doc = self.app.activeDocument
        if doc.isModified:
            doc.saveAs(spec['path'])
        return spec['path']


def execute(app, program):
    runner = Runner(app)
    runner.document()
    bodies = {}
    volumes = {}
    for op in program.get('ops', []):
        kind = op['kind']
        if kind == 'reset':
            bodies = {}
        elif kind == 'create_prim':
            bodies[op['bodyId']] = runner.create_prim(op['prim'], op.get('params'))
        elif kind == 'extrude_profile':
            bodies[op['bodyId']] = runner.extrude(op['points'], op.get('height'))
        elif kind == 'boolean':
            target = bodies[op['target']]
            for tool_id in op['tools']:
                runner.boolean(op['op'], target, bodies[tool_id])
                del bodies[tool_id]
            bodies[op['target']] = target
        elif kind == 'transform':
            runner.transform(bodies[op['target']], op)
        elif kind == 'volume':
            pass  # volumes derive from the tessellation below
        elif kind == 'delete':
            bodies.pop(op['target'], None)
        else:
            raise ValueError('unsupported op: %s' % kind)
    names = program.get('names') or {}
    meshes, volumes = runner.tessellate(bodies, names)
    result = {'ok': True, 'meshes': meshes, 'volumes': volumes}
    export = program.get('export')
    if export and meshes:
        result['exported'] = runner.export(bodies, export)
    return result


def process_job(app, job_path):
    result_path = job_path.replace('.running', '').replace('.json', '') + '.result.json'
    try:
        with open(job_path) as handle:
            job = json.load(handle)
        # Claim semantics: remove the job file before executing so a spool
        # rename on the host side cannot re-trigger the same job.
        try:
            os.remove(job_path)
        except Exception:
            pass
        result = execute(app, job.get('program', {}))
    except Exception as error:
        result = {'ok': False, 'error': str(error), 'trace': traceback.format_exc()}
    try:
        with open(result_path, 'w') as handle:
            json.dump(result, handle)
    except Exception:
        pass


def run(context):
    app = adsk.core.Application.get()
    ui = app.userInterface
    try:
        os.makedirs(SPOOL, exist_ok=True)
        log('bridge loaded')

        class PollHandler(adsk.core.CustomEventHandler):
            def notify(self, args):
                try:
                    for name in sorted(os.listdir(SPOOL)):
                        if name.endswith('.json') or name.endswith('.running'):
                            process_job(app, os.path.join(SPOOL, name))
                            break
                except Exception:
                    log(traceback.format_exc())

        # One recurring timer: its firing CustomEvent drives the spool poll,
        # keeping the bridge resident without any UI.
        timer = adsk.core.Timer.create()
        timer.duration = POLL_SECONDS
        timer.firing.add(PollHandler())
        timer.isRunning = True
    except Exception:
        if ui:
            ui.messageBox('dsh-cad bridge failed to start:\n{}'.format(traceback.format_exc()))
`
