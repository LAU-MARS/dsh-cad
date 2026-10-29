# cadorange 集成契约

dsh-cad 的内核后端策略：**经由 [cadorange](https://github.com/LAU-MARS/cadorange)**
（agent 原生 CAD 运行时，底层 occt.ts/OCCT WASM）建模，公共 API 覆盖不到的
绘制面走其**官方逃生口** `cadorange/occt`（ADR-0001：共存而非包裹）。

## 当前状态（v0.16.x 起）

- **适配层已全量落地**：`src/modeling/cadorange-adapter.cjs` 实现 dsh-cad 全部
  内核动词（原语/布尔/圆角/倒角/抽壳/拔模/拉伸/旋转/放样/扫掠/变换/阵列支撑/
  体积/描述/导出/草图渲染），不再有 "unsupported" 存根。
- **依赖 cadorange ^0.10.0**（occt.ts 2.0.0）：装配模型（关节族/
  connectTo/solve/explode/STEP 装配往返）由其公共 API 提供——但 dsh-cad 把
  关节代数实现在**主线程 TypeScript**（`src/modeling/joints.ts`，镜像其
  Location 代数到 translate + XYZ Euler 约定），工具层解算后经既有
  `assembly_transform` op 写回，worker 只做存在性校验——**与内核无关**
  （直连 occt.ts 后端下关节/爆炸同样可用），重放不依赖任何数学。
- **双门禁全绿**：`npm test`（默认内核）与 `DSH_CAD_KERNEL=cadorange npm test`
  均通过全部用例（精确体积断言不变），满足下方切换判据。
- 内核链：**cadorange → occt.ts 直连**（cadorange 启动失败会以警告降级到
  直连后端，不挂死；cadorange 自带 occt.ts 2.0.0，直连档用本仓的 1.x）。
  显式 `DSH_CAD_KERNEL=cadorange` 仍为硬性要求（不可解析或 init 失败 → 干净报错），
  `DSH_CAD_KERNEL=occt.ts` 强制直连；`opencascade.js` 档已于 v0.15.1 移除
  （显式指定会得到带迁移指引的报错）。

## 构成

| 文件 | 职责 |
| --- | --- |
| `src/modeling/cadorange-bridge.cjs` | 解析并加载**同一包实例**的两个入口：`cadorange`（公共 API）与 `cadorange/occt`（逃生口，与核心共享内核单例）。解析链：`DSH_CADORANGE`（包根或 dist 文件）→ Node 依赖解析 → **node_modules 手动探测**（cadorange 0.10.0 发布包的 exports 指向 `./src/*.ts` 而包内只有 `dist/`，`require.resolve` 失败时直接探测 `<node_modules>/cadorange/dist`）→ 兄弟 checkout `../cadorange`；一律动态 `import()`（issue #5 教训）。逃生口缺失的 dist 会被拒绝（网格/HLR 必需） |
| `src/modeling/cadorange-adapter.cjs` | dsh-cad 适配面 → cadorange 公共 API + 逃生口 |
| `src/modeling/joints.ts` | 关节代数（主线程、纯数学）：build123d 关节族的帧/运动/配对表/connect 求解/solve 重放/爆炸偏移，映射到 dsh-cad 的 translate + XYZ Euler 放置约定——工具层 (`cad_assembly_joint/connect/drive/solve/explode`) 的解算核心，op-log fold 复用同一模块 |
| `src/modeling/modeling-worker.cjs` | `boot()` 的内核选择链；画图在 cadorange 后端走 `adapter.hiddenLineViewsOf`（同一 WASM 会话，无 STEP 往返）；body 替换/删除/重置时经 `adapter.dispose` 释放形状；`import_step`（探测/实例化两相，按资产路径缓存解析，reset 清缓存） |

## 动词映射（公共 API vs 逃生口）

| dsh-cad 动词 | cadorange 侧 | 通道 |
| --- | --- | --- |
| `makePrim`（含 `at`/`axis`） | `Box/Cylinder/Sphere/Cone/Torus`（loc {origin, zDir}）；Cone/Torus 非 +Z 轴 | 公共 API；轴向锥/环走逃生口 `occ.makeCone/makeTorus({origin, direction})` |
| `boolean` / `filletAll` / `chamferAll` | `shape.cut/fuse/common`（默认 clean）、`fillet/chamfer(shape, shape.edges(), r)` | 公共 API |
| `extrudeProfile2D` / `makeRevolve` | `extrude(wire, h, {dir})` / `revolve(wire, {origin, direction}, deg)` | 公共 API |
| `makeLoft`（plain/smooth/through/profile 截面） | `loft(wires, {ruled})`；`solid:false` 经逃生口 | 公共 API；截面线构造见下 |
| `makeSweep`（3D 折线路径） | `sweep(profile, spine)` | 公共 API；spine 走逃生口 `occ.makePolygon(3D 点)` |
| `shell` / `draft` | `shell(shape, t, {open})` / `draft(shape, deg, {direction})`（默认自动选壁，与 dsh-cad 语义一致） | 公共 API |
| `transform`（平移/欧拉旋转/镜像） | `translate` / `rotate(Axis.X/Y/Z)` / 原生 `mirror({plane})` | 公共 API |
| `volume` / `isValid` / `centroid` / `describe` | `volume()/isValid()/center()/meta()`（describe 归一化为 dsh-cad 形状，faces[].origin 供法向匹配） | 公共 API |
| `tessellate`（查看器网格） | `getOcc().tessellate(shape.wrapped)` | 逃生口（occt.ts 已拷出缓冲区） |
| `faceNormals` | 纯 JS 平面法向（与直连后端逐字节一致） | 本仓 |
| `exportFile`（step/stl） | `exportStep`；STL 按 dsh-cad 契约在本地打包**二进制**（cadorange 导出 ASCII） | 公共 API + 本仓打包 |
| `exportStepDocument`（结构化装配 STEP） | `exportStepAssembly`（XCAF 文档，identity → transform null） | 公共 API |
| `importStepDocument`（STEP 结构化导入） | `importStepAssembly` + `Assembly.fromStep`（叶子世界烘焙 → 反烘焙回局部几何 + 世界位姿；occt.ts 2.0.0 契约）。适配层按局部几何 meta（体积/面积/包围盒）去重出唯一部件，`copyShape`（fromRaw）让每个 body 持有自己的内核对象 | 公共 API + 逃生口 |
| `hiddenLineViewsOf`（工程图 HLR） | `getOcc().hiddenLines(shape.wrapped, {direction, up})`，结果帧重映射 + 段链接（复用 occt-bridge 的 chain/simplify） | 逃生口；省掉 STEP 导出/回读与第二个 WASM 实例 |
| `sketchWirePoints` / `sketchFaceMesh`（草图覆盖层） | 直线/圆弧 JS 解析；B 样条离散与 `makeFace` 走逃生口 | 混合 |
| 截面/轮廓线构造（line/arc/bspline/circle，任意平面） | 先在世界 XY 构建（occt.ts 圆参数 0=+X 的角度约定），再 `located(Location(o, u×v, u))` 刚性搬移 | 逃生口 + 公共 API |

## 生命周期与内存

cadorange 形状由其注册表显式管理（`dispose`，FinalizationRegistry 兜底）。
worker 在 body 替换（fillet/chamfer/shell/draft/transform/boolean）、布尔消耗、
`delete` 与 `reset` 时调用 `adapter.dispose`；直连后端无此方法，自动跳过。

## 切换判据（已达成）

1. ✅ `init()` 真实加载内核（cadorange 0.10.0，occt.ts ^2.0.0——cadorange 自带；直连档 occt.ts ^1.1.0）
2. ✅ `tessellate` / HLR 经逃生口可用（查看器与工程图正常）
3. ✅ `DSH_CAD_KERNEL=cadorange` 下全套测试通过（216 passed，
   精确体积断言与直连后端一致；默认链翻转后同一套在无环境变量下复跑全绿）

## 测试

`test/cadorange-adapter.test.ts`：bridge 解析（含 DSH_CADORANGE 覆盖、逃生口
缺失拒绝）、真实 worker 启动断言 `kernel: 'cadorange'`、以及真内核 parity 门禁
（精确体积、网格、STEP/装配 STEP 字节、true-HLR 视图）。

## 已知差异

- cadorange 布尔默认过 UnifySameDomain（clean）——直连后端不过；拓扑面数可能
  不同（体积/面积一致，全套断言通过）。
- STL 导出在适配层本地打包为二进制（与直连后端字节同格式），不使用 cadorange
  的 ASCII `exportStl`。
- dsh-cad 侧保留 occt.ts 直连适配器（`occtts-adapter.cjs`）作为回退层级，
  并已适配 occt.ts 1.1.0 的 `chamfer` 签名（`distance2 = NaN` 选对称倒角）。
- **opencascade.js 第三级已于 v0.15.1 移除**：它是链上唯一独立的 wasm 二进制，
  但能力残缺（无真 B 样条、几何读不回、HLR 不可用）且占 64MB 安装体积；
  移除后 occt.ts wasm 成为单点，两级代码路径（cadorange API / 直连绑定）仍互为备份。
