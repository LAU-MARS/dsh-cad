# SolidWorks bridge demo (Windows scaffold)

SolidWorks 桌面版仅 Windows（COM/.NET API），本目录是 **GeometryExecutor 契约的 Windows 端 demo 脚手架**：
在与 dsh-cad 相同的 op 程序（ops.json）与结果格式（result.json）上驱动 SolidWorks。
当前代码是**盲写脚手架**（编写时无 Windows 环境）——切到 Windows 后按下列步骤验证收尾。

## 契约

```
dsh-cad 主机                          Windows 工作机
─────────────                        ──────────────
写 <work-dir>/ops.json      ──────▶  DshCadBridge.exe <work-dir>
  { ops:[{kind:"create_prim",…}],      │ COM → SldWorks.Application
    names, export:{path,format} }      │ IModeler 造型 / IBody2 布尔 / GetTessTriangles 网格化
读 <work-dir>/result.json   ◀──────  写 result.json
  { ok, meshes:[{positions,normals,
     indices,vertexCount,…}], volumes, exported }
```

与 FreeCAD/Fusion 桥完全同构 —— 网格回传后走同一条 `/dsh-cad/bin/` 二进制管线，
前端 WebGL 显示层零改动（后端只影响生成质量）。

## 构建（Windows + SolidWorks 已安装）

```powershell
dotnet new console -n DshCadBridge
Copy-Item DshCadBridge.cs DshCadBridge\Program.cs -Force
# 引用 SolidWorks 互操作（二选一）:
#   1) NuGet: dotnet add package SolidWorks.Interop.sldworks
#      dotnet add package SolidWorks.Interop.swconst
#   2) 或项目里 Add COM Reference: SldWorks 20xx Type Library
dotnet build -c Release
```

## 首次运行验证清单（TODO on Windows）

- [ ] `SldWorks.Application` ProgID 激活与 `Visible` 行为
- [ ] 默认零件模板存在（`swDefaultTemplatePart`，否则先在 SolidWorks 里建一次模板）
- [ ] `IModeler::CreateBodyFromBox3` / `CreateBodyFromCyl` 的确切重载与参数包
- [ ] `IBody2::Operations2` 布尔返回体与错误码
- [ ] `GetTessTriangles` 的 safe-array 打包（9 double/三角形）
- [ ] `SaveAs3` STEP/STL 导出参数
- [ ] 收敛后：在 dsh-cad 里实现 `solidworks-executor.ts`（探测 exe → 复制 ops.json 到
      临时目录 → 调用本桥 → 读 result.json → 映射 `ExecutorMesh`），注册进 `EXECUTORS`

## 远程形态（macOS/Linux 主机）

在 Windows 工作机上将本桥包一层 HTTP 服务（收 ops.json / 回 result.json），
dsh-cad 侧 executor 走 REST —— 契约不变，`available()` 探测远端可达性即可。
