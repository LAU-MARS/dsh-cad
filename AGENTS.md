# AGENTS.md — 本地开发 / 启动注意事项

面向 coding agent（及人类）的本地环境要点，来自实际踩坑记录（2026-09-06，v0.2.0 拉取后的重启）。

## 标准启动流程

```sh
git pull
npm install        # 关键：见下方「occt.ts 上游依赖」
npm run build      # 关键：见下方「link 模式必须重新构建」
# 若 3080 被旧实例占用，先 kill（见下方「端口占用」）
dsh web            # http://127.0.0.1:3080
```

## 多文档 file 空间（2026-09-06 起）

建模文档不再是一整个工作区共享的单例，而是命名的文档集合：

- 存储：`<workspace>/.dsh-cad/docs/<docId>.json` + 清单 `index.json`
  （含 `sessionBindings`：会话 → 活动文档）。旧的单文件 `model.json`
  会在首次加载时自动迁移为「导入的模型」文档，并由第一个建模的会话认领。
- 会话绑定：每个聊天会话（工具 `exec.agent.id`）绑定一个活动文档；
  新会话首个建模操作自动落在**新的空文档**上（不再继承旧零件）。
  切换文档 = reset worker + 重放该文档 ops（交错会话会触发重放，正确但慢）。
- 工具：`cad_docs`（列表）/ `cad_doc_new`（新建+切换）/ `cad_doc_open`
  （打开+重放）/ `cad_doc_rename` / `cad_doc_delete`（需 confirm=true）。
- UI：CAD 面板页签栏的文件夹按钮 → 工作区文档列表（点击预览、行尾删除
  二次确认）；数据来自 `GET /dsh-cad/docs`，删除走
  `POST /dsh-cad/docs/delete?id=`。点击仅预览——切换建模目标要在对话里说
  「打开 xx 文档」。

## 踩坑记录

### 1. occt.ts 上游依赖（最重要）

工程图（`cad_drawing`）的真 HLR 隐藏线内核跑在 **occt.ts**（npm 包，~20MB wasm）上，
这是**硬依赖——缺失即报错，没有降级引擎**。它追踪上游最新版，`package.json`
里版本号会随功能演进而提升，因此：

- **每次 `git pull` 之后必须重新 `npm install`**。本次踩坑：拉取 v0.2.0 后
  `node_modules/occt.ts` 不存在（新引入的依赖），不装直接构建/启动会失败。
- 安装后确认内核 dist 就位：`ls node_modules/occt.ts/dist`（应含 `cli.js` 等）。
- 内核 dist 解析顺序（`src/modeling/occt-bridge.cjs`）：
  `DSH_OCCTJS_DIST` 环境变量 → `node_modules/occt.ts/dist`（npm，默认）
  → `<repo>/../opencascade-ts/dist`（同级 checkout）→ `vendor/`
  → `node_modules/opencascade-ts`。
  若要试用上游未发布的新特性，可 checkout opencascade-ts 到仓库同级目录，
  或设 `DSH_OCCTJS_DIST` 指向其 dist，无需改代码。

### 2. link 模式：改代码 / 拉代码后必须重新构建

web profile 通过 `"dsh-cad": "link:/Users/kane/work/dsh-cad"` 链接本仓库
（见 `~/.dsh/profiles/web/package.json`）。dsh 加载的是 **`lib/` 构建产物**，
不是 `src/`——pull 或改码后不跑 `npm run build`，页面跑的还是旧代码。

### 3. 端口 3080 被旧实例占用（EADDRINUSE）

`dsh web` 监听 `127.0.0.1:3080`。之前启动的实例可能一直挂着（本次遇到一个
跑了 6 天的），再次启动会报：

```
Error: failed to apply loader entry webserver: listen EADDRINUSE: 127.0.0.1:3080
```

处理：

```sh
lsof -nP -iTCP:3080 -sTCP:LISTEN   # 找到旧实例 PID（确认是 dsh web 再杀）
kill <PID>
dsh web
```

加 `--no-open` 可避免启动时自动开浏览器。

### 4. 非交互 shell 里 node / dsh 不在 PATH

本机 node 由 **nvm** 管理（`~/.nvm/versions/node/`，需 ≥22，当前用 v22.23.2），
非交互 shell（CI、脚本、agent 的裸 bash）不会加载 nvm，`node`/`npm`/`dsh`
全部 command not found。解决：

```sh
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
```

`dsh` CLI（0.1.1-rc.2，满足 engines 要求）装在该 node 的全局 `node_modules` 下，
PATH 修正后即可用。

## 快速验证

- 服务健康：`curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3080/` → `200`
- 测试套件：`npm test`（含 drawing / assembly 的 41+ 用例）
- 浏览器卡片可视化：`node test/visual/serve.mjs`（http://127.0.0.1:3987）
