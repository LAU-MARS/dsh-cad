const fs = require('node:fs'), path = require('node:path')
globalThis.__dirname = process.cwd()
const loaderPath = '/Users/kane/work/dsh-cad/node_modules/opencascade.js/dist/opencascade.wasm.js'
const m = require(loaderPath)
const wasmBinary = fs.readFileSync(path.join(path.dirname(loaderPath), 'opencascade.wasm.wasm'))
;(m.default ?? m)({ wasmBinary }).then(occt => {
  console.log('FS exposed:', typeof occt.FS)
  const pnt = (x,y,z) => new occt.gp_Pnt_3(x,y,z)
  const box = new occt.BRepPrimAPI_MakeBox_3(pnt(0,0,0), pnt(100,60,5)).Shape()
  const ax = new occt.gp_Ax2_3(pnt(50,30,0), new occt.gp_Dir_4(0,0,1))
  const hole = new occt.BRepPrimAPI_MakeCylinder_3(ax, 10, 20).Shape()
  const cut = new occt.BRepAlgoAPI_Cut_3(box, hole); cut.Build()
  const plate = cut.Shape()

  // STEP write into MEMFS, then read out via FS
  const sw = new occt.STEPControl_Writer_1()
  sw.Transfer(plate, 0, true)
  const status = sw.Write('model.step')
  let bytes = null
  try { bytes = occt.FS.readFile('model.step') } catch (e) { console.log('FS read fail:', e.message.slice(0,60)) }
  console.log('STEP status:', status, 'memfs bytes:', bytes ? bytes.length : 'none')
  if (bytes) fs.writeFileSync('/tmp/m0d.step', Buffer.from(bytes))

  // STL the same way
  const stl = new occt.StlAPI_Writer()
  stl.Write(plate, 'model.stl')
  const stlBytes = occt.FS.readFile('model.stl')
  fs.writeFileSync('/tmp/m0d.stl', Buffer.from(stlBytes))
  console.log('STL memfs bytes:', stlBytes.length)
  process.exit(0)
}).catch(e => { console.log('FAIL', e.message); process.exit(1) })
