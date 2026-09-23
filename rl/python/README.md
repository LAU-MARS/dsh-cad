# verl-side skeleton（rl/python）

这个目录放训练侧（Python / verl）的东西。环境本体在 `rl/server/`（Node，
复用主仓库的 OCCT 建模内核），两边只通过 HTTP 通信——训练机不需要装
Node 依赖，只要能访问 env server。

## 目录

| 路径 | 用途 |
| --- | --- |
| `tools/cad_tools_schema.json` | 暴露给 policy 的 OpenAI 格式工具定义（`cad_op` / `cad_state` / `cad_submit`），与 `rl/server/tool_schemas.mjs` 手工镜像，改动要同步 |
| `scripts/random_rollout.py` | 随机策略冒烟测试（纯标准库，无需 verl/GPU），给出 reward 基线 |
| `configs/grpo_cad_demo.yaml` | verl GRPO 配置草稿（**键名需按你安装的 verl 版本核对**） |

## 冒烟流程（无需 verl）

```sh
# 终端 1：起 env server（需要先 npm install && npm run build）
node rl/server/env_server.mjs --port 8990

# 终端 2：Python 侧随机 rollout
python rl/python/scripts/random_rollout.py --url http://127.0.0.1:8990 --episodes 4
```

预期：随机策略 reward 远低于脚本化 demo（`node rl/demo/run_demo.mjs`
里精确复现是 1.0）。

## 接入 verl（v2 待办）

env server 已按 verl 自定义 tool server 的 HTTP 约定暴露
`/initialize` 与 `/execute`。verl 各版本的请求/响应字段有差异，
建议做法：在 `rl/python/` 加一层薄适配（把 verl 的 tool 请求转发到
env server，字段名对齐），而不是改 env server 迁就某个 verl 版本。

episode 绑定：`/execute` 支持可选 `episode_id`；v1 冒烟模式下缺省绑定
最近一次 `/reset` 的 episode。真正的多环境并行 rollout 需要在适配层
按 rollout 请求分发 episode（每个 episode 一个独立 OCCT worker，互不
干扰，env server 端已就绪）。

训练数据：v1 任务集内嵌在 `rl/server/tasks.mjs`；v2 换成数据集文件
（prompt + 目标 ops / 目标 STEP），并补 `scripts/make_prompts.py`
生成 parquet。
