# cadorange 集成契约（cadorange-adapter 分支）

dsh-cad 的内核后端策略：**不再直接对接 occt.ts，而是经由 [cadorange](https://github.com/LAU-MARS/cadorange)**
（agent 原生 CAD 运行时，底层仍是 occt.ts/OCCT WASM）。本分支建立对接缝。

## 当前状态

- cadorange 处于 M0 骨架阶段：`init()` 尚未接 WASM 内核（抛 "not implemented"）。
- dsh-cad 侧已就位：解析链 + 适配器 + 内核选择接线 + 测试。
- 默认内核链**不变**（occt.ts → opencascade.js）；cadorange 为显式 opt-in：
  `DSH_CAD_KERNEL=cadorange`（不可解析或 init 失败 → 干净报错，不挂死）。

## 构成

| 文件 | 职责 |
| --- | --- |
| `src/modeling/cadorange-bridge.cjs` | 解析并加载 cadorange：`DSH_CADORANGE`（包根或 dist 文件）→ Node 依赖解析（早期包导出指向 TS 源码，自动改用 dist）→ 兄弟 checkout `../cadorange/packages/cadorange/dist/index.js`。一律动态 `import()`（issue #5 教训） |
| `src/modeling/cadorange-adapter.cjs` | 把 dsh-cad 的 21 动词适配面映射到 cadorange 公共 API；未覆盖动词抛「unsupported + 里程碑」结构化错误 |
| `src/modeling/modeling-worker.cjs` | `boot()` 的 cadorange 分支（opt-in，硬性需求语义） |

## cadorange 侧需要提供的（按 dsh-cad 适配面）

| dsh-cad 动词 | cadorange 对应 | 状态 |
| --- | --- | --- |
| `makePrim`（box/cylinder/sphere/cone/torus，含 `at` 定位） | `Box/Cylinder/Sphere/Cone/Torus` + loc/平移 | M0（loc 语义待定） |
| `boolean`（fuse/cut/common） | `shape.fuse/cut` 或同名函数 | M0 |
| `filletAll` / `chamferAll`（全锐边） | `fillet(shape.edges(), r)` / `chamfer(...)` | M0（需无参 `edges()` 全量选择） |
| `volume` / `isValid` / `describe` | `shape.describe()`（volume/valid/faces/edges） | M0 |
| `tessellate`（查看器网格，内存 bytes） | `exportShape(shape, 'stl')` 字节回传 → STL 桥接解析 | **关键缺口**，M0 需含内存导出 |
| `exportFile`（step/stl bytes） | `exportShape` | M0 |
| `extrudeProfile2D`（曲线段轮廓） | 草图系统 + extrude | M1 |
| `makeLoft` / `makeSweep` / `makeRevolve` | loft/sweep/revolve | M1 |
| `shell` / `draft` | 同名 | M1 |
| `transform`（平移/欧拉/镜像） | `shape.translate(...)` / loc | M0 期内需要 |
| `faceNormals` / `sketchWirePoints` / `sketchFaceMesh` | dsh-cad 查看器/草图渲染专用 | 或保留在 dsh-cad 网格层 |
| `exportStepDocument`（结构化装配 STEP） | — | dsh-cad 特有，可能常驻本仓 |
| 工程图 HLR（`hiddenLineViews`） | `@cadorange/render`（SVG 多视图） | M2 对齐 |

## 切换判据（把默认内核翻成 cadorange 的门槛）

1. `init()` 真实加载内核；M0/M1 动词覆盖上表前 13 行
2. `tessellate` 或等效内存网格导出可用（否则查看器无图）
3. dsh-cad 全套测试在 `DSH_CAD_KERNEL=cadorange` 下通过（体积解析断言不变）

## 测试

- `test/cadorange-adapter.test.ts`：mock 模块验证委托与 unsupported 错误形状；
  `DSH_CADORANGE` 解析；真实 worker 走 cadorange 分支（当前断言「干净报错」，
  cadorange init 落地后自动转为断言 `kernel: 'cadorange'`）。
