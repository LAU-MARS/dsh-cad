/**
 * FreeCAD external executor: probe a local FreeCAD install, run a feature
 * program (the same op shapes as the built-in kernel) through a Python
 * bridge in FreeCAD's console binary, and read back tessellated meshes +
 * volumes. Each run is an isolated temp-dir process — no shared state with
 * the WASM session worker.
 */
import { execFile, spawn } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { readdirSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

/** Mesh shape shared with the WASM worker pipeline. */
export interface FreeCadMesh {
  bodyId: string
  name: string
  positions: Float32Array
  normals: Float32Array
  indices: Uint32Array
  vertexCount: number
  triangleCount: number
}

export interface FreeCadProgram {
  ops: Array<Record<string, unknown>>
  /** bodyId → display name (from create ops). */
  names?: Record<string, string>
  input?: { format: 'step' | 'stp' | 'brep' | 'stl'; path: string; bodyId?: string }
  export?: { format: 'step' | 'stp' | 'stl'; path: string }
  /** Put the final bodies into a FreeCAD document so the GUI shows them. */
  display?: boolean
}

export interface FreeCadResult {
  meshes: FreeCadMesh[]
  volumes: Record<string, number>
  exported?: string
}

let probed: string | null | undefined
let probedGui: string | null | undefined

function firstExisting(candidates: string[]): string | null {
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }
  return null
}

function windowsInstallDirs(): string[] {
  const dirs: string[] = []
  const roots = [process.env.ProgramFiles ?? 'C:\\Program Files', process.env['ProgramFiles(x86)'] ?? 'C:\\Program Files (x86)']
  if (process.env.LOCALAPPDATA !== undefined) roots.push(path.join(process.env.LOCALAPPDATA, 'Programs'))
  for (const root of roots) {
    try {
      for (const entry of readdirSync(root)) {
        if (/^freecad/i.test(entry)) {
          const bin = path.join(root, entry, 'bin')
          for (const exe of ['freecadcmd.exe', 'FreeCADCmd.exe', 'freecad.exe', 'FreeCAD.exe']) {
            dirs.push(path.join(bin, exe))
          }
        }
      }
    } catch {
      // No such root — skip.
    }
  }
  return dirs
}

function findFreeCadIn(gui: boolean): string | null {
  // FREECAD_BIN points at the console binary; its GUI sibling sits next to it.
  if (process.env.FREECAD_BIN !== undefined && process.env.FREECAD_BIN !== '') {
    if (gui) {
      const sibling = path.join(path.dirname(process.env.FREECAD_BIN), 'FreeCAD.exe')
      if (existsSync(sibling)) return sibling
    } else {
      return process.env.FREECAD_BIN
    }
  }
  const candidates = gui
    ? [
        '/usr/bin/freecad', '/usr/local/bin/freecad',
        '/Applications/FreeCAD.app/Contents/MacOS/FreeCAD',
        ...windowsInstallDirs().reverse(),
      ]
    : [
        '/usr/bin/freecadcmd', '/usr/local/bin/freecadcmd',
        '/usr/bin/FreeCADCmd', '/opt/freecad/bin/freecadcmd',
        '/Applications/FreeCAD.app/Contents/MacOS/FreeCADCmd',
        '/usr/bin/freecad', '/usr/local/bin/freecad',
        ...windowsInstallDirs(),
      ]
  return firstExisting(candidates)
}

/**
 * Locate a FreeCAD console executable: FREECAD_BIN env → PATH candidates →
 * common install directories. Cached after the first probe. Pass
 * `{ gui: true }` for the GUI binary (windowed) variant.
 */
export function findFreeCad(options: { gui?: boolean } = {}): string | null {
  if (options.gui === true) {
    if (probedGui === undefined) probedGui = findFreeCadIn(true)
    return probedGui
  }
  if (probed === undefined) probed = findFreeCadIn(false)
  return probed
}

/** Whether an external FreeCAD executor is usable on this machine. */
export function freecadAvailable(): boolean {
  return findFreeCad() !== null
}

/** The Python bridge executed inside FreeCAD's console binary. */
const BRIDGE = String.raw`
import json, math, os, struct, traceback

import FreeCAD
import Part

BASE = os.path.dirname(os.path.abspath(__file__))
OPS_PATH = os.path.join(BASE, 'ops.json')
RESULT_PATH = os.path.join(BASE, 'result.json')


def write(result):
    with open(RESULT_PATH, 'w') as handle:
        json.dump(result, handle)


def vec(value, default=(0.0, 0.0, 0.0)):
    if not value:
        return FreeCAD.Vector(*default)
    return FreeCAD.Vector(float(value[0]), float(value[1]), float(value[2]))


def orient(shape, at, axis):
    if at:
        shape.translate(vec(at))
    if axis:
        target = vec(axis, (0.0, 0.0, 1.0))
        if target.Length < 1e-9:
            return shape
        target.normalize()
        if abs(target.z - 1.0) > 1e-9:
            rotation = FreeCAD.Rotation(FreeCAD.Vector(0, 0, 1), target)
            shape.transformShape(rotation.toMatrix(), True)
    return shape


def make_prim(prim, params):
    params = params or {}
    if prim == 'box':
        shape = Part.makeBox(float(params.get('dx', 10)), float(params.get('dy', 10)), float(params.get('dz', 10)))
    elif prim == 'cylinder':
        shape = Part.makeCylinder(float(params.get('radius', 5)), float(params.get('height', 10)))
    elif prim == 'sphere':
        shape = Part.makeSphere(float(params.get('radius', 5)))
    elif prim == 'cone':
        shape = Part.makeCone(float(params.get('radius1', 5)), float(params.get('radius2', 0)), float(params.get('height', 10)))
    elif prim == 'torus':
        shape = Part.makeTorus(float(params.get('majorRadius', 10)), float(params.get('minorRadius', 2)))
    else:
        raise ValueError('unknown primitive: %s' % prim)
    return orient(shape, params.get('at'), params.get('axis'))


def extrude_profile(points, height, base):
    pts = []
    for i in range(0, len(points) - 1, 2):
        pts.append(FreeCAD.Vector(float(points[i]), float(points[i + 1]), float(base or 0.0)))
    if len(pts) < 3:
        raise ValueError('profile needs at least 3 points')
    if (pts[-1] - pts[0]).Length > 1e-9:
        pts.append(pts[0])
    return Part.Face(Part.makePolygon(pts)).extrude(FreeCAD.Vector(0, 0, float(height or 10)))


def mesh_to_shape(path):
    import Mesh, MeshPart
    return MeshPart.meshToShape(Mesh.Mesh(str(path)))


def flat_normal(a, b, c):
    n = (b - a).cross(c - a)
    length = n.Length
    if length > 1e-12:
        n = FreeCAD.Vector(n.x / length, n.y / length, n.z / length)
    else:
        n = FreeCAD.Vector(0, 0, 1)
    return [n.x, n.y, n.z]


def tessellate(body_id, shape, name):
    verts, facets = shape.tessellate(0.4)
    positions = []
    normals = []
    indices = []
    for v in verts:
        positions.extend([v.x, v.y, v.z])
    for f in facets:
        a, b, c = verts[f[0]], verts[f[1]], verts[f[2]]
        n = flat_normal(a, b, c)
        normals.extend(n + n + n)
        indices.extend([f[0], f[1], f[2]])
    return {
        'bodyId': body_id,
        'name': name or body_id,
        'positions': positions,
        'normals': normals,
        'indices': indices,
        'vertexCount': len(verts),
        'triangleCount': len(facets),
    }


def write_stl(shape, path):
    verts, facets = shape.tessellate(0.2)
    with open(path, 'wb') as handle:
        handle.write(b'\0' * 80)
        handle.write(struct.pack('<I', len(facets)))
        for f in facets:
            a, b, c = verts[f[0]], verts[f[1]], verts[f[2]]
            n = flat_normal(a, b, c)
            handle.write(struct.pack('<3f', n[0], n[1], n[2]))
            for v in (a, b, c):
                handle.write(struct.pack('<3f', v.x, v.y, v.z))
            handle.write(struct.pack('<H', 0))


def run(spec):
    bodies = {}
    volumes = {}
    source = spec.get('input')
    if source:
        fmt = str(source.get('format', 'step')).lower()
        body_id = source.get('bodyId', 'input')
        if fmt in ('step', 'stp', 'brep'):
            bodies[body_id] = Part.read(str(source['path']))
        elif fmt == 'stl':
            bodies[body_id] = mesh_to_shape(source['path'])
        else:
            raise ValueError('unsupported input format: %s' % fmt)
    for op in spec.get('ops', []):
        kind = op['kind']
        if kind == 'reset':
            bodies = {}
        elif kind == 'create_prim':
            bodies[op['bodyId']] = make_prim(op['prim'], op.get('params'))
        elif kind == 'extrude_profile':
            bodies[op['bodyId']] = extrude_profile(op['points'], op.get('height'), op.get('base'))
        elif kind == 'boolean':
            target = bodies[op['target']]
            operation = op['op']
            for tool_id in op['tools']:
                tool = bodies[tool_id]
                if operation == 'cut':
                    target = target.cut(tool)
                elif operation == 'fuse':
                    target = target.fuse(tool)
                elif operation == 'common':
                    target = target.common(tool)
                else:
                    raise ValueError('unknown boolean: %s' % operation)
                del bodies[tool_id]
            bodies[op['target']] = target
        elif kind == 'fillet':
            shape = bodies[op['target']]
            bodies[op['target']] = shape.makeFillet(float(op['radius']), shape.Edges)
        elif kind == 'transform':
            shape = bodies[op['target']]
            if op.get('translate'):
                shape.translate(vec(op['translate']))
            rotate = op.get('rotate')
            if rotate:
                for axis, angle in ((FreeCAD.Vector(1, 0, 0), rotate[0]), (FreeCAD.Vector(0, 1, 0), rotate[1]), (FreeCAD.Vector(0, 0, 1), rotate[2])):
                    if abs(float(angle)) > 1e-9:
                        shape.rotate(FreeCAD.Vector(0, 0, 0), axis, float(angle))
            mirror = op.get('mirror')
            if mirror:
                shape = shape.mirror(FreeCAD.Vector(0, 0, 0), vec(mirror, (0.0, 0.0, 1.0)))
            bodies[op['target']] = shape
        elif kind == 'volume':
            volumes[op['target']] = bodies[op['target']].Volume
        elif kind == 'delete':
            bodies.pop(op['target'], None)
        else:
            raise ValueError('unsupported op: %s' % kind)
    names = spec.get('names') or {}
    result = {'ok': True, 'meshes': [tessellate(i, s, names.get(i)) for i, s in bodies.items()], 'volumes': volumes}
    export = spec.get('export')
    if export:
        fmt = str(export.get('format', 'step')).lower()
        target_path = str(export['path'])
        shapes = list(bodies.values())
        if len(shapes) == 0:
            raise ValueError('nothing to export — the program produced no bodies')
        if fmt in ('step', 'stp'):
            # Part.export() writes files Part.read() loads as null shapes in
            # FreeCAD 1.1 — a compound through exportStep() round-trips.
            Part.Compound(shapes).exportStep(target_path)
        elif fmt == 'stl':
            write_stl(shapes[0], target_path)
        else:
            raise ValueError('unsupported export format: %s' % fmt)
        result['exported'] = target_path
    if spec.get('display'):
        document = FreeCAD.newDocument('dsh-cad')
        for body_id, shape in bodies.items():
            obj = document.addObject('Part::Feature', body_id)
            obj.Label = names.get(body_id, body_id)
            obj.Shape = shape
        document.recompute()
    return result


try:
    with open(OPS_PATH) as handle:
        write(run(json.load(handle)))
    print('###DSH-OK###')
except Exception as error:
    write({'ok': False, 'error': str(error), 'trace': traceback.format_exc()})
    print('###DSH-ERR###')
`

interface BridgeMesh {
  bodyId: string
  name: string
  positions: number[]
  normals: number[]
  indices: number[]
  vertexCount: number
  triangleCount: number
}

interface BridgeResult {
  ok: boolean
  error?: string
  trace?: string
  meshes?: BridgeMesh[]
  volumes?: Record<string, number>
  exported?: string
}

export interface RunFreeCadOptions {
  timeoutMs?: number
  /** Run in the FreeCAD GUI (detached window that stays open, showing the bodies). */
  gui?: boolean
}

/**
 * Run a feature program in an external FreeCAD process and return tessellated
 * meshes + volumes (+ exported file path). Console mode waits for exit; GUI
 * mode detaches the windowed process and polls for the result file.
 */
export async function runFreeCadProgram(program: FreeCadProgram, options: RunFreeCadOptions = {}): Promise<FreeCadResult> {
  const timeoutMs = options.timeoutMs ?? 300_000
  const gui = options.gui === true
  const executable = findFreeCad(gui ? { gui: true } : {})
  if (executable === null) {
    throw new Error(
      gui
        ? 'FreeCAD GUI was not found — install FreeCAD or point FREECAD_BIN at its console binary'
        : 'FreeCAD was not found — install FreeCAD or point FREECAD_BIN at its console binary (freecadcmd)',
    )
  }

  const dir = await mkdtemp(path.join(tmpdir(), 'dsh-cad-freecad-'))
  const resultPath = path.join(dir, 'result.json')
  if (gui) {
    // Detached GUI window: the bridge writes result.json while the document
    // stays open on screen; the temp dir is left for the running process.
    await writeFile(path.join(dir, 'bridge.py'), BRIDGE)
    await writeFile(path.join(dir, 'ops.json'), JSON.stringify(program))
    const child = spawn(executable, [path.join(dir, 'bridge.py')], {
      detached: true,
      stdio: 'ignore',
      windowsHide: false,
    })
    child.unref()
    const deadline = Date.now() + timeoutMs
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      if (existsSync(resultPath)) {
        const parsed = JSON.parse(await readFile(resultPath, 'utf8')) as BridgeResult
        const mapped = mapBridgeResult(parsed)
        // The script has finished executing; the temp files are no longer
        // needed by the still-open GUI window.
        await rm(dir, { recursive: true, force: true }).catch(() => undefined)
        return mapped
      }
    }
    throw new Error('the FreeCAD GUI produced no result before the timeout')
  }

  try {
    const script = path.join(dir, 'bridge.py')
    const specPath = path.join(dir, 'ops.json')
    await writeFile(script, BRIDGE)
    await writeFile(specPath, JSON.stringify(program))

    const stdout = await new Promise<string>((resolve, reject) => {
      execFile(executable, [script], { timeout: timeoutMs, windowsHide: true, maxBuffer: 64 * 1024 * 1024 }, (error, out) => {
        if (error !== null && error.killed !== true) {
          reject(new Error(`FreeCAD exited with an error: ${(error as Error).message}`))
          return
        }
        resolve(String(out))
      })
    })

    let parsed: BridgeResult
    try {
      parsed = JSON.parse(await readFile(resultPath, 'utf8')) as BridgeResult
    } catch {
      throw new Error(`the FreeCAD bridge produced no result (stdout: ${stdout.slice(-400)})`)
    }
    return mapBridgeResult(parsed)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

function mapBridgeResult(parsed: BridgeResult): FreeCadResult {
  if (!parsed.ok) {
    throw new Error(`FreeCAD bridge failed: ${parsed.error ?? 'unknown error'}`)
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
