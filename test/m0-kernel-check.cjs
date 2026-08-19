const fs = require('node:fs'), path = require('node:path')
globalThis.__dirname = process.cwd()
const loaderPath = '/Users/kane/work/dsh-cad/node_modules/opencascade.js/dist/opencascade.wasm.js'
const m = require(loaderPath)
const wasmBinary = fs.readFileSync(path.join(path.dirname(loaderPath), 'opencascade.wasm.wasm'))
;(m.default ?? m)({ wasmBinary }).then(occt => {
  const results = []
  const check = (n, ok, d='') => { results.push((ok?'PASS ':'FAIL ')+n+(d?' — '+d:'')); if(!ok) process.exitCode = 1 }
  const pnt = (x,y,z) => new occt.gp_Pnt_3(x,y,z)
  const box = new occt.BRepPrimAPI_MakeBox_3(pnt(0,0,0), pnt(100,60,5)).Shape()
  const ax = new occt.gp_Ax2_3(pnt(50,30,0), new occt.gp_Dir_4(0,0,1))
  const hole = new occt.BRepPrimAPI_MakeCylinder_3(ax, 10, 20).Shape()
  const cut = new occt.BRepAlgoAPI_Cut_3(box, hole); cut.Build()
  const plate = cut.Shape()
  check('primitives+cut', cut.IsDone() && !plate.IsNull())

  const props = new occt.GProp_GProps_2(pnt(0,0,0))
  occt.BRepGProp.VolumeProperties_1(plate, props, false, true, true)
  const expectedVol = 100*60*5 - Math.PI*10*10*5
  check('cut volume', Math.abs(props.Mass() - expectedVol) < 5, props.Mass().toFixed(0)+' ≈ '+expectedVol.toFixed(0))

  // fillet all edges
  try {
    const fillet = new occt.BRepFilletAPI_MakeFillet(plate, 1e-4)
    const exp = new occt.TopExp_Explorer_2(plate, occt.TopAbs_ShapeEnum.TopAbs_EDGE, occt.TopAbs_ShapeEnum.TopAbs_SHAPE)
    let edges = 0
    while (exp.More()) { fillet.Add_2(1.5, occt.TopoDS.Edge_s ? occt.TopoDS.Edge_s(exp.Current()) : occt.TopoDS.Edge_2(exp.Current())); edges++; exp.Next() }
    fillet.Build()
    check('fillet all', fillet.IsDone() && !fillet.Shape().IsNull(), edges+' edges')
  } catch (e) { check('fillet all', false, e.message.slice(0,50)) }

  // tessellation
  const mesher = new occt.BRepMesh_IncrementalMesh_2(plate, 0.5, false, 0.5, true)
  mesher.Perform_1()
  let tris = 0, verts = 0
  const fe = new occt.TopExp_Explorer_2(plate, occt.TopAbs_ShapeEnum.TopAbs_FACE, occt.TopAbs_ShapeEnum.TopAbs_SHAPE)
  while (fe.More()) {
    const face = occt.TopoDS.Face_2(fe.Current())
    const loc = new occt.TopLoc_Location_2(new occt.gp_Trsf_1())
    const handle = occt.BRep_Tool.Triangulation(face, loc)
    const tri = handle && !handle.IsNull() ? handle.get() : null
    if (tri) { tris += tri.NbTriangles(); verts += tri.NbNodes() }
    fe.Next()
  }
  check('tessellation', tris > 0, tris+' tris / '+verts+' verts')

  // extract one triangle to validate data path
  try {
    const fe2 = new occt.TopExp_Explorer_2(plate, occt.TopAbs_ShapeEnum.TopAbs_FACE, occt.TopAbs_ShapeEnum.TopAbs_SHAPE)
    const face = occt.TopoDS.Face_2(fe2.Current())
    const loc = new occt.TopLoc_Location_2(new occt.gp_Trsf_1())
    const handle = occt.BRep_Tool.Triangulation(face, loc)
    const tri = handle.get()
    const n1 = tri.Node(1), n2 = tri.Node(2), n3 = tri.Node(3)
    check('vertex access', Number.isFinite(n1.X()) && Number.isFinite(n2.Y()) && Number.isFinite(n3.Z()),
      `v1=(${n1.X().toFixed(1)},${n1.Y().toFixed(1)},${n1.Z().toFixed(1)})`)
  } catch (e) { check('vertex access', false, e.message.slice(0,60)) }

  // transform: translate
  try {
    const trsf = new occt.gp_Trsf_1()
    trsf.SetTranslation_1(new occt.gp_Vec_4(10, 20, 30))
    const moved = new occt.BRepBuilderAPI_Transform_2(plate, trsf, true).Shape()
    check('transform', !moved.IsNull(), 'translated shape built')
  } catch (e) { check('transform+bbox', false, e.message.slice(0,60)) }

  console.log(results.join('\n'))
  console.log(process.exitCode ? 'M0 FAILED' : 'M0 ALL PASS')
  process.exit(process.exitCode ?? 0)
}).catch(e => { console.log('FAIL', e.message); process.exit(1) })
