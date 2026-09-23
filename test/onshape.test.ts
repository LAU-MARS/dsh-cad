/**
 * The Onshape cloud executor: request signing, standard-feature compilation
 * (op program → BTM feature payloads), STL decode, and the full document
 * pipeline over a mocked fetch (no network in tests).
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createHmac } from 'node:crypto'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { signOnshapeRequest, onshapeAvailable, onshapeCredentials, codegenOp, codegenProgram, encodeBinaryStl, cadMeshToExecutorMesh, runOnshapeProgram } from '../src/cad_connector/onshape-executor.js'
import { parseSTL } from '../src/convert/stl.js'
import type { BTFeaturePayload } from '../src/cad_connector/onshape-executor.js'

const ENV_KEYS = ['DSH_ONSHAPE_ACCESS_KEY', 'DSH_ONSHAPE_SECRET_KEY', 'DSH_ONSHAPE_BASE_URL', 'ONSHAPE_ACCESS_KEY', 'ONSHAPE_SECRET_KEY']
const savedEnv: Record<string, string | undefined> = {}

beforeEach(() => {
  for (const key of ENV_KEYS) {
    savedEnv[key] = process.env[key]
    delete process.env[key]
  }
})

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key]
    else process.env[key] = savedEnv[key]
  }
  vi.unstubAllGlobals()
})

const param = (feature: BTFeaturePayload, parameterId: string): Record<string, unknown> | undefined =>
  feature.parameters.find((parameter) => parameter.parameterId === parameterId)

describe('credentials + availability', () => {
  it('is unavailable without credentials and reports why', () => {
    expect(onshapeCredentials()).toBeNull()
    expect(onshapeAvailable()).toBe(false)
  })

  it('reads DSH_* keys with the unprefixed fallback and base URL override', () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    expect(onshapeCredentials()).toEqual({ baseUrl: 'https://cad.onshape.com', accessKey: 'ak', secretKey: 'sk' })
    delete process.env.DSH_ONSHAPE_ACCESS_KEY
    delete process.env.DSH_ONSHAPE_SECRET_KEY
    process.env.ONSHAPE_ACCESS_KEY = 'ak2'
    process.env.ONSHAPE_SECRET_KEY = 'sk2'
    process.env.DSH_ONSHAPE_BASE_URL = 'https://url.kea.onshape.com/'
    expect(onshapeCredentials()).toEqual({ baseUrl: 'https://url.kea.onshape.com', accessKey: 'ak2', secretKey: 'sk2' })
    expect(onshapeAvailable()).toBe(true)
  })
})

describe('request signing', () => {
  it('matches a hand-computed HMAC over the lowercased six-field payload', () => {
    const signature = signOnshapeRequest('GET', 'nonce0123456789abcd', 'Mon, 11 Apr 2016 20:08:56 GMT', 'application/json', '/api/v6/documents', 'a=1', 'secret')
    const expected = createHmac('sha256', 'secret')
      .update('get\nnonce0123456789abcd\nmon, 11 apr 2016 20:08:56 gmt\napplication/json\n/api/v6/documents\na=1\n')
      .digest('base64')
    expect(signature).toBe(expected)
  })

  it('changes when the query changes (query is part of the signature)', () => {
    const a = signOnshapeRequest('GET', 'n1', 'd', 'application/json', '/api/v6/x', '', 's')
    const b = signOnshapeRequest('GET', 'n1', 'd', 'application/json', '/api/v6/x', 'mode=binary', 's')
    expect(a).not.toBe(b)
  })
})

describe('standard-feature compilation', () => {
  it('compiles a box into a rectangle sketch + blind extrude', () => {
    const features = codegenProgram({ ops: [{ kind: 'create_prim', bodyId: 'b', prim: 'box', params: { dx: 60, dy: 40, dz: 5 } }] }, 'tok')
    expect(features).toHaveLength(2)
    const [sketch, extrude] = [features[0]!.feature, features[1]!.feature]
    expect(sketch.btType).toBe('BTMSketch-151')
    expect(sketch.featureType).toBe('newSketch')
    expect(sketch.entities).toHaveLength(4)
    // Sketch geometry rides the wire in meters.
    expect(sketch.entities?.[0]?.geometry).toMatchObject({ btType: 'BTCurveGeometryLine-117', pntX: 0, pntY: 0, length: 0.06 })
    expect(sketch.parameters?.[0]).toMatchObject({
      btType: 'BTMParameterQueryList-148',
      parameterId: 'sketchPlane',
      queries: [{ queryString: 'query=qCreatedBy(makeId("Top"), EntityType.FACE);' }],
    })
    expect(param(extrude, 'bodyType')).toMatchObject({ btType: 'BTMParameterEnum-145', enumName: 'ExtendedToolBodyType', value: 'SOLID' })
    expect(param(extrude, 'operationType')).toMatchObject({ value: 'NEW' })
    expect(param(extrude, 'endBound')).toMatchObject({ value: 'BLIND' })
    expect(param(extrude, 'depth')).toMatchObject({ btType: 'BTMParameterQuantity-147', expression: '5 mm' })
    expect(param(extrude, 'entities')).toMatchObject({
      btType: 'BTMParameterQueryList-148',
      queries: [{ btType: 'BTMIndividualSketchRegionQuery-140', featureId: 'f0_toksk' }],
    })
    // The compiler declares which client token each push's assigned id replaces.
    expect(features.map((entry) => entry.produces)).toEqual(['f0_toksk', 'f0_tok'])
  })

  it('honors at for cylinders and offsets the extrude start in z', () => {
    const features = codegenProgram(
      { ops: [{ kind: 'create_prim', bodyId: 'c', prim: 'cylinder', params: { radius: 6, height: 20, at: [10, 5, 2] } }] },
      'tok',
    )
    const sketch = features[0]!.feature
    expect(sketch.entities?.[0]?.geometry).toMatchObject({ btType: 'BTCurveGeometryCircle-115', xCenter: 0.01, yCenter: 0.005, radius: 0.006 })
    const extrude = features[1]!.feature
    expect(param(extrude, 'startBound')).toMatchObject({ value: 'BLIND' })
    expect(param(extrude, 'startDepth')).toMatchObject({ expression: '2 mm' })
  })

  it('compiles boolean cut to SUBTRACTION with query tracking', () => {
    const bodies = new Map<string, string>()
    codegenOp({ kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 10 } }, 'f0', 'l0', bodies)
    codegenOp({ kind: 'create_prim', bodyId: 'hole', prim: 'cylinder', params: { radius: 2 } }, 'f1', 'l1', bodies)
    const [cut] = codegenOp({ kind: 'boolean', op: 'cut', target: 'plate', tools: ['hole'] }, 'f2', 'l2', bodies)
    expect(cut.feature.featureType).toBe('booleanBodies')
    expect(param(cut.feature, 'operationType')).toMatchObject({ enumName: 'BooleanOperationType', value: 'SUBTRACTION' })
    expect(param(cut.feature, 'targets')).toMatchObject({
      queries: [{ queryString: 'query = qCreatedBy(makeId("f0"), EntityType.BODY);' }],
    })
    expect(param(cut.feature, 'tools')).toMatchObject({
      queries: [{ queryString: 'query = qCreatedBy(makeId("f1"), EntityType.BODY);' }],
    })
    expect(bodies.get('plate')).toBe('qCreatedBy(makeId("f2"), EntityType.BODY)')
    expect(bodies.has('hole')).toBe(false)
  })

  it('closes profile polygons and chains fillet queries to the creator', () => {
    const [profileCompiled] = codegenOp(
      { kind: 'extrude_profile', bodyId: 'p', points: [0, 0, 20, 0, 20, 10, 0, 10], height: 5 },
      'f0',
      'l0',
      new Map(),
    )
    expect(profileCompiled.feature.entities).toHaveLength(4)
    const bodies = new Map<string, string>()
    codegenOp({ kind: 'create_prim', bodyId: 'b', prim: 'box', params: {} }, 'f0', 'l0', bodies)
    const [fillet] = codegenOp({ kind: 'fillet', target: 'b', radius: 2 }, 'f1', 'l1', bodies)
    expect(param(fillet.feature, 'entities')).toMatchObject({ queries: [{ queryString: 'query = qCreatedBy(makeId("f0"), EntityType.EDGE);' }] })
    expect(param(fillet.feature, 'radius')).toMatchObject({ expression: '2 mm' })
    expect(bodies.get('b')).toBe('qCreatedBy(makeId("f1"), EntityType.BODY)')
  })

  it('rejects unsupported ops with explicit errors', () => {
    expect(() => codegenOp({ kind: 'reset' }, 'f0', 'l0', new Map())).toThrow(/reset/)
    expect(() => codegenOp({ kind: 'create_prim', bodyId: 's', prim: 'sphere', params: {} }, 'f0', 'l0', new Map())).toThrow(/sphere/)
    expect(() => codegenOp({ kind: 'transform', target: 'x', translate: [1, 0, 0] }, 'f0', 'l0', new Map())).toThrow(/transform/)
    expect(() => codegenOp({ kind: 'boolean', op: 'cut', target: 'ghost', tools: ['b'] }, 'f0', 'l0', new Map())).toThrow(/never created/)
  })
})

describe('STL decode into executor meshes', () => {
  it('round-trips a binary STL with derived flat normals', () => {
    const triangles: Array<[number[], number[], number[]]> = [
      [[0, 0, 0], [10, 0, 0], [0, 10, 0]],
      [[0, 0, 0], [0, 10, 0], [0, 0, 10]],
    ]
    const stl = encodeBinaryStl(triangles)
    const parsed = parseSTL(stl, 'probe')
    const mesh = cadMeshToExecutorMesh(parsed, 'p1')
    expect(mesh.bodyId).toBe('p1')
    expect(mesh.name).toBe('probe')
    expect(mesh.triangleCount).toBe(2)
    expect(mesh.vertexCount).toBeGreaterThanOrEqual(3)
    expect(mesh.indices.length).toBe(6)
    expect(mesh.positions.length).toBe(mesh.vertexCount * 3)
    expect(mesh.normals.length).toBe(mesh.positions.length)
    let maxNormal = 0
    for (const value of mesh.normals) maxNormal = Math.max(maxNormal, Math.abs(value))
    expect(maxNormal).toBeGreaterThan(0.5)
  })
})

interface MockCall {
  method: string
  pathname: string
  body?: unknown
}

/**
 * A scripted Onshape server: routes on method+pathname and records calls.
 */
function mockOnshapeFetch(options: {
  parts?: Array<{ partId: string; name: string }>
  stl?: Buffer
  massProperties?: Record<string, { volume?: number[] }>
  featureStatus?: string
  step?: Buffer
  parasolid?: Buffer
  translationResult?: unknown
}) {
  const calls: MockCall[] = []
  const pushedFeatureIds: string[] = []

  const handler = async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const parsed = new URL(String(url))
    const method = String(init?.method ?? 'GET')
    const body = typeof init?.body === 'string' ? (JSON.parse(init.body) as Record<string, unknown>) : undefined
    calls.push({ method, pathname: parsed.pathname, body })
    const respond = (value: unknown) => new Response(JSON.stringify(value), { status: 200, headers: { 'content-type': 'application/json' } })

    if (method === 'POST' && parsed.pathname === '/api/v6/documents') {
      return respond({ id: 'doc1', name: (body as { name?: string })?.name ?? 'dsh-cad', defaultWorkspace: { id: 'w1' } })
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/documents/d/doc1/w/w1/elements') {
      return respond([{ id: 'ps1', name: 'Part Studio 1', elementType: 'PARTSTUDIO' }])
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/partstudios/d/doc1/w/w1/e/ps1/features') {
      const list = pushedFeatureIds.map((fid) => ({ feature: { featureId: fid, name: 'dsh-cad f' }, featureState: { featureStatus: options.featureStatus ?? 'OK' } }))
      return respond({ features: list })
    }
    if (method === 'POST' && parsed.pathname === '/api/v6/partstudios/d/doc1/w/w1/e/ps1/features') {
      const feature = (body as { feature?: { featureId?: string; featureType?: string } })?.feature
      pushedFeatureIds.push(feature?.featureId ?? `${feature?.featureType}-${pushedFeatureIds.length}`)
      return respond({ featureState: { featureStatus: options.featureStatus ?? 'OK' }, feature: { featureId: pushedFeatureIds[pushedFeatureIds.length - 1] } })
    }
    if (method === 'DELETE' && parsed.pathname.startsWith('/api/v6/partstudios/d/doc1/w/w1/e/ps1/features/featureid/')) {
      return respond({})
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/parts/d/doc1/w/w1/e/ps1') {
      return respond(options.parts ?? [{ partId: 'p1', name: 'Part 1' }])
    }
    if (method === 'GET' && parsed.pathname.startsWith('/api/v6/parts/d/doc1/w/w1/e/ps1/partid/p1/stl')) {
      return new Response(options.stl ?? encodeBinaryStl([[[0, 0, 0], [10, 0, 0], [0, 10, 0]]]))
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/partstudios/d/doc1/w/w1/e/ps1/stl') {
      return new Response(options.stl ?? encodeBinaryStl([[[0, 0, 0], [10, 0, 0], [0, 10, 0]]]))
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/partstudios/d/doc1/w/w1/e/ps1/massproperties') {
      return respond({ bodies: options.massProperties ?? { p1: { volume: [4.7124e-7] }, '-all-': { volume: [4.7124e-7] } } })
    }
    if (method === 'POST' && parsed.pathname === '/api/v6/partstudios/d/doc1/w/w1/e/ps1/translations') {
      return respond({ id: 'tr1', requestState: 'ACTIVE' })
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/translations/tr1') {
      return respond(options.translationResult ?? { requestState: 'DONE', resultExternalDataIds: ['fx1'] })
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/documents/d/doc1/externaldata/fx1') {
      return new Response(options.step ?? Buffer.from('INVALID STEP'))
    }
    if (method === 'GET' && parsed.pathname === '/api/v6/partstudios/d/doc1/w/w1/e/ps1/parasolid') {
      return new Response(options.parasolid ?? Buffer.from('PARASOLID-BYTES'))
    }
    return new Response(JSON.stringify({ message: `no route for ${method} ${parsed.pathname}` }), { status: 404, headers: { 'content-type': 'application/json' } })
  }
  return { handler, calls, pushedFeatureIds }
}

describe('the Onshape run pipeline (mocked REST)', () => {
  it('creates a document, pushes features, and reads parts back as meshes', async () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    const mock = mockOnshapeFetch({})
    vi.stubGlobal('fetch', mock.handler)

    const result = await runOnshapeProgram({
      ops: [
        { kind: 'create_prim', bodyId: 'plate', prim: 'box', params: { dx: 60, dy: 40, dz: 5 } },
        { kind: 'create_prim', bodyId: 'boss', prim: 'cylinder', params: { radius: 8, height: 15, at: [30, 20, 5] } },
        { kind: 'boolean', op: 'fuse', target: 'plate', tools: ['boss'] },
        { kind: 'volume', target: 'plate' },
      ],
    })

    expect(mock.calls[0]).toMatchObject({ method: 'POST', pathname: '/api/v6/documents' })
    // box: sketch+extrude, cylinder: sketch+extrude, boolean: 1, volume: 0
    expect(mock.pushedFeatureIds).toHaveLength(5)
    expect(result.meshes).toHaveLength(1)
    expect(result.meshes[0]).toMatchObject({ bodyId: 'p1', name: 'Part 1' })
    expect(result.volumes['Part 1']).toBeCloseTo(471.24, 6)
    expect(result.documentId).toBe('doc1')
    expect(result.documentUrl).toBe('https://cad.onshape.com/documents/doc1')
    expect(result.exported).toBeUndefined()
  }, 30_000)

  it('writes a local STL export of the whole Part Studio', async () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    const dir = await mkdtemp(path.join(tmpdir(), 'dsh-onshape-'))
    const target = path.join(dir, 'result.stl')
    const stl = encodeBinaryStl([[[0, 0, 0], [10, 0, 0], [0, 10, 0]], [[0, 0, 0], [0, 10, 0], [0, 0, 10]]])
    const mock = mockOnshapeFetch({ stl })
    vi.stubGlobal('fetch', mock.handler)

    try {
      const result = await runOnshapeProgram({
        ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: { dx: 1, dy: 1, dz: 1 } }],
        export: { format: 'stl', path: target },
      })
      expect(result.exported).toBe(target)
      const written = await readFile(target)
      expect(written.length).toBe(stl.length)
      expect(written.readUInt32LE(80)).toBe(2)
    } finally {
      await rm(dir, { recursive: true, force: true })
    }
  }, 30_000)

  it('readback "none" builds the model and returns only the document link', async () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    const mock = mockOnshapeFetch({})
    vi.stubGlobal('fetch', mock.handler)
    const result = await runOnshapeProgram({
      ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: { dx: 10, dy: 10, dz: 10 } }],
      readback: 'none',
    })
    expect(result.meshes).toHaveLength(0)
    expect(result.volumes).toEqual({})
    expect(result.documentUrl).toBe('https://cad.onshape.com/documents/doc1')
    // No geometry reads: no parts list, no STL, no mass properties.
    expect(mock.calls.some((call) => call.pathname.endsWith('/parts/d/doc1/w/w1/e/ps1'))).toBe(false)
    expect(mock.calls.some((call) => call.pathname.includes('/partid/'))).toBe(false)
  }, 30_000)

  it('distinguishes quota cooldown (after a success) from bad credentials (first call)', async () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    // First run succeeds; the next gets 401 — that's the cooldown signature.
    const mock = mockOnshapeFetch({})
    vi.stubGlobal('fetch', mock.handler)
    await runOnshapeProgram({ ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: {} }], readback: 'none' })
    const exhausted = mockOnshapeFetch({})
    vi.stubGlobal('fetch', (url: string | URL | Request, init?: RequestInit) => {
      const pathname = new URL(String(url)).pathname
      if (pathname === '/api/v6/documents' || pathname.startsWith('/api/v6/documents/d/')) {
        return new Response(JSON.stringify({ message: 'Unauthenticated API request' }), { status: 401, headers: { 'content-type': 'application/json' } })
      }
      return exhausted.handler(url, init)
    })
    await expect(
      runOnshapeProgram({ ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: {} }], readback: 'none' }),
    ).rejects.toThrow(/quota exhausted|rate-limit cooldown/)
  }, 30_000)

  it('rejects export under readback "none"', async () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    const mock = mockOnshapeFetch({})
    vi.stubGlobal('fetch', mock.handler)
    await expect(
      runOnshapeProgram({
        ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: {} }],
        readback: 'none',
        export: { format: 'stl', path: 'C:/tmp/x.stl' },
      }),
    ).rejects.toThrow(/readback "none"/)
  }, 30_000)

  it('readback "step" translates, downloads, and parses exact BRep into named meshes', async () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    const stepFixture = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'sample.step'))
    const mock = mockOnshapeFetch({ step: stepFixture })
    vi.stubGlobal('fetch', mock.handler)

    const result = await runOnshapeProgram({
      ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: { dx: 30, dy: 20, dz: 10 } }],
      readback: 'step',
    })
    // The whole flow: translation POST, poll, external-data download, local
    // OCCT parse of the downloaded bytes — meshes from real STEP geometry.
    expect(mock.calls.some((call) => call.method === 'POST' && call.pathname.endsWith('/translations'))).toBe(true)
    expect(mock.calls.some((call) => call.method === 'GET' && call.pathname === '/api/v6/translations/tr1')).toBe(true)
    expect(mock.calls.some((call) => call.method === 'GET' && call.pathname === '/api/v6/documents/d/doc1/externaldata/fx1')).toBe(true)
    expect(mock.calls.some((call) => call.method === 'GET' && call.pathname.endsWith('/partid/p1/stl'))).toBe(false)
    expect(result.meshes.length).toBeGreaterThanOrEqual(1)
    expect(result.meshes[0]?.triangleCount).toBeGreaterThan(0)
    expect(result.meshes[0]?.positions.length).toBeGreaterThan(0)
  }, 60_000)

  it('exports Parasolid (.x_t) and STEP (.step) files locally', async () => {
    process.env.DSH_ONSHAPE_ACCESS_KEY = 'ak'
    process.env.DSH_ONSHAPE_SECRET_KEY = 'sk'
    const dir = await mkdtemp(path.join(tmpdir(), 'dsh-onshape-exp-'))
    const stepFixture = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'sample.step'))
    const mock = mockOnshapeFetch({ step: stepFixture, parasolid: Buffer.from('PARASOLID-TEST-DATA') })
    vi.stubGlobal('fetch', mock.handler)
    try {
      const xt = path.join(dir, 'part.x_t')
      const viaXt = await runOnshapeProgram({
        ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: {} }],
        export: { format: 'step', path: xt },
      })
      expect(viaXt.exported).toBe(xt)
      expect((await readFile(xt)).toString()).toBe('PARASOLID-TEST-DATA')
      expect(mock.calls.some((call) => call.method === 'GET' && call.pathname.endsWith('/parasolid'))).toBe(true)

      const step = path.join(dir, 'part.step')
      const viaStep = await runOnshapeProgram({
        ops: [{ kind: 'create_prim', bodyId: 'a', prim: 'box', params: {} }],
        export: { format: 'step', path: step },
      })
      expect(viaStep.exported).toBe(step)
      expect((await readFile(step)).equals(stepFixture)).toBe(true)
    } finally {
      await rm(dir, { recursive: true, force: true })
    }
  }, 60_000)
})
