# dsh-cad — CAD Plugin for DeepSeek Harness

![dsh-cad banner](docs/img/banner.svg)

[![homepage](https://img.shields.io/badge/homepage-dsh--cad-4D6BFE)](https://lau-mars.github.io/dsh-cad/)
[![dsh plugin](https://img.shields.io/badge/dsh-plugin-4D6BFE)](https://github.com/deepseek-ai/deepseek-harness)
[![Node](https://img.shields.io/badge/node-%3E%3D%2022-4D6BFE)](https://nodejs.org/)
[![OCCT](https://img.shields.io/badge/kernel-OCCT-4D6BFE)](https://github.com/donalffons/opencascade.js)
[![License: MIT](https://img.shields.io/badge/license-MIT-4D6BFE)](./LICENSE)

English | [简体中文](./README.zh-CN.md)

A CAD plugin for [DeepSeek Harness (dsh)](https://github.com/deepseek-ai/deepseek-harness):
an **embedded 3D/2D CAD viewer** plus a **native parametric modeling tool family**
(OCCT kernel) in the Web UI, letting the agent build and inspect CAD geometry
step by step — "model while you watch".

## Preview

The CAD editor at startup: the demo L-bracket parsed from the packaged
`demo-bracket.brep` by OCCT — face + edge rendering, hover measurement of the
picked face (4,800 mm²), a ViewCube navigation cube in the corner, and
switchable demo parts (bracket / flange / shaft):

![dsh-cad CAD editor](docs/img/bracket-preview.png)

## Feature Overview

| Capability | Description |
| --- | --- |
| 🔍 CAD viewing | STL / OBJ / STEP / IGES / BREP / DCPRT (3D), DXF / SVG (2D); interactive in-chat card (orbit / zoom / wireframe / pan) |
| 🧭 CAD editor interactions | Onshape-style ViewCube (26-zone click-to-orient), hover/click face & edge picking with live measurement (area mm² / length mm), Faces+Edges / Faces / Wireframe render modes, switchable BRep demo parts (bracket / flange / shaft) |
| 🏗️ Parametric modeling | Primitives (box/cylinder/sphere/cone/torus), profile extrusion, booleans (fuse/cut/common), all-edge fillet, transforms (translate/rotate/mirror) — exact OCCT BRep, not a mesh approximation |
| 📐 Geometry measurement | Exact volume (mm³), bounding box, triangle counts, DXF layers |
| 📤 On-demand export | STEP (parametric) / STL (mesh); files are written only when the user asks |
| 🖥️ Persistent 3D view panel | A permanent "3D" tab in the session tab bar: XYZ axes + grid (Z-up) when empty, **tracks the latest model in real time** while modeling |
| ⚡ Zero-copy render pipeline | worker mesh → in-memory binary → three.js typed arrays; zero base64 / zero intermediate files / zero per-step disk writes |
| 💾 Modeling document persistence | Operation log (JSON) + debounced disk mirror; automatically replayed to restore state after a process restart |
| 🖼️ Image → profile | PNG sketch/screenshot → Otsu binarization → contour tracing → extrusion-ready polygon (`cad_image_profile`) |
| 🔌 FreeCAD executor | Run the same op family on an external FreeCAD console (STEP in/out); requires a local FreeCAD install |

## Installation (dev mode)

```sh
git clone https://github.com/LAU-MARS/dsh-cad.git
cd dsh-cad
npm install && npm run build && npm test

npm install -g @deepseek-ai/dsh pnpm   # requires Node ≥ 22
dsh web                                  # let the first launch init the profile, then Ctrl-C

dsh plugin --profile web add /path/to/dsh-cad

# append to ~/.dsh/profiles/web/cordis.patch.yml:
#   - insert:
#       - id: dsh-cad
#         name: 'dsh-cad'

dsh web
```

Set `DEEPSEEK_API_KEY` and you are ready — for example:

- “open bracket.stl” → `cad_view`
- “model a 100×60×5 plate, punch a ⌀20 hole in the middle, R2 fillets on the four
  corners, add a ⌀16 boss 20 tall, export plate.step”
  → `cad_create_prim` + `cad_boolean` + `cad_fillet` + `cad_export`, with the 3D tab
  updating live at every step
- “build a snowman” → spheres + a cone nose + a cylinder hat (precise `at`/`axis` placement)

## Modeling Tool Family

| Tool | Description |
| --- | --- |
| `cad_view` | Open a CAD file and render an interactive viewer card |
| `cad_info` | Read-only geometry metadata (format / counts / bounding box / units / layers) |
| `cad_create_prim` | Primitives (mm, Z-up); `at` for placement, `axis` for orientation (exact axis-angle rotation) |
| `cad_extrude_profile` | Extrude a closed XY-plane polygon along +Z into a solid |
| `cad_boolean` | fuse / cut / common (classic hole punching: plate cut cylinder) |
| `cad_fillet` | Constant-radius fillet on all sharp edges |
| `cad_transform` | Translate / Euler rotate / mirror |
| `cad_volume` | Exact BRep volume (mm³) |
| `cad_export` | Export STEP / STL / DCPRT (the native replayable part document) to a workspace path |
| `cad_delete` | Delete a body |
| `cad_freecad` | Run an op program on an external FreeCAD executor (optional STEP input / export) |
| `cad_image_profile` | PNG → contours → extrusion-ready polygon points |

After every modeling step: **the same viewer card refreshes in place** (stable viewId +
versioned URL), and the "3D" tab tracks the latest model in real time.

## Connectors (roadmap)

Modeling today runs on the **built-in WebGL-class kernel** (OCCT in the browser —
zero install). The connectors below refer to **external CAD engines** acting as
executors for the same tool family, planned for future support:

| Connector | Suite | Status |
| --- | --- | --- |
| **Built-in kernel** | CAD modeling kernel based on OCCT + WebGL, runs in the browser — zero install | ✅ Built-in |
| FreeCAD | open-source parametric suite — natural local executor via its Python API | ✅ Available (needs local install) |
| SolidWorks | Dassault Systèmes industry-standard 3D CAD | 🚧 Planned |
| Fusion 360 | Autodesk cloud-connected CAD/CAM | 🚧 Planned |
| Onshape | cloud-native SaaS CAD, fully in the browser | 🚧 Planned |
| ZW3D（中望3D） | ZWSOFT all-in-one CAD/CAM | 🚧 Planned |
| GstarCAD 3D（浩辰3D） | Gstarsoft 3D CAD | 🚧 Planned |

## Architecture

```
cad_view(path)                        modeling tools (cad_create_prim, …)
  → import worker (occt-import-js)      → modeling worker (opencascade.js WASM)
  → CadScene JSON (base64-f32)          → exact BRep geometry + meshing
  → GET /dsh-cad/scene/<id>            → in-memory binary scene (f32/u32 packed)
                                        → GET /dsh-cad/bin/<docId>
            ↓ session presentationMeta (viewId + versioned URL) ↓
        browser card + persistent "3D" tab (three.js / SVG, Z-up, XYZ axes)
```

- **Two workers**: import (occt-import-js, read-only STEP/IGES/BREP) and modeling
  (opencascade.js 1.1.1, full OCCT) are separate, both lazily started; the `_N`
  suffix convention of embind overloaded constructors is wrapped in
  `src/modeling/occt-adapter.cjs` (all verified at runtime)
- **Zero-copy pipeline**: modeling scenes use zero base64 / zero large JSON arrays /
  zero per-step disk writes (disk mirror debounced 1.5s, replayed only on service
  restart); `cad_export` is the only explicit file export
- **Modeling document**: `<workspace>/.dsh-cad/model.json` operation log; all bodies
  are restored by replay after a restart
- **Client**: esbuild single-file CJS factory (three.js inlined ~560KB, react provided
  by the host module table), Z-up CAD convention, empty scene with XYZ axis labels
  and a ground grid always displayed

## Tests

```sh
npm test                             # 41 tests: converters / modeling worker (exact volume assertions) / DCPRT round-trip / FreeCAD executor / image profiles / binary pipeline
node test/m0-kernel-check.cjs        # OCCT kernel API smoke test
node test/route-check.mjs            # JSON scene routing layer
node test/visual/serve.mjs           # browser card/tab visual verification page (http://127.0.0.1:3987)
```

Representative assertions covered: the boolean-punched volume exactly equals the
analytic value (28429.20 mm³), L-shaped profile extrusion 3000 mm³, volumes and
bounding-box flips of sphere/cone/torus placed with `at`/`axis`, 8-byte alignment
of the binary packing, an STL export round-trip (export → read back by the
phase-1 parser), and a DCPRT document round-trip (serialize → replay on the
OCCT worker → exact bounds).

## Known Limitations

- DWG (closed-source) is unsupported; DXF bulge arcs are approximated by chords;
  glTF/3MF viewing is not implemented (the structure is reserved)
- `cad_fillet` is all-edge constant-radius (per-edge selection is unstable under
  embind); chamfer is not implemented
- Sketch extrusion supports polygon profiles only (arc profiles are constructed by
  boolean combinations of cylinders/tori)
- dsh framework limitation: an already-mounted single slot (the right-side details
  panel itself) does not respond to components registered later, so the persistent
  view is provided as the "3D" view tab (a list slot, the official composition)
- The host reads CAD files via node:fs (the platform fs service supports UTF-8 text
  only and cannot carry binary data)

## Contributors

Auto-generated from the commit history — thanks to everyone who has contributed!

[![Contributors](https://contrib.rocks/image?repo=LAU-MARS/dsh-cad)](https://github.com/LAU-MARS/dsh-cad/graphs/contributors)

## License

MIT
