# rl/ — agentic RL（verl）工作目录

`verl` 分支的训练侧代码。环境本体是无头的 CAD 建模环境，直接复用主仓库
的 OCCT 内核（`lib/modeling/client.js` → `createModelClient()`），通过
HTTP 对外提供服务；训练侧（Python / verl）不碰 Node。

## 设计要点

- **无头是硬约束**：没有 Web UI、没有 scene store、没有 viewer 路由。
  MDP 就是 `prompt → 工具调用 → 文本观测`，reward 在环境侧由最终
  tessellation 计算。渲染不进循环（v2 若做多模态观测，以 `cad_image`
  式的显式工具加入，由 agent 主动调用）。
- **episode = 一个独立 OCCT worker**（`worker_threads`）。episode 之间
  零共享、零重放：reset 就是新 worker，崩溃只死一个 episode（以
  reward=0 终止，不拖垮训练进程）。这绕开了主分支"每进程一个共享
  worker + 交叉会话重放"的架构——那个适合交互使用，不适合并行 rollout。
- **目标即内核**：v1 任务的 target mesh 由同一内核跑同一组 ops 生成
  （进程内缓存），完美复现得 reward=1.0（chamfer 恰为 0），无需外部
  数据集。
- **reward = 0.4·体积比 + 0.3·包围盒IoU + 0.3·exp(-Chamfer/尺度)**，
  纯 JS、确定性种子采样，分量随 episode 记录便于诊断。

## 目录

```
rl/
├─ server/                    # 环境本体（Node，无头）
│  ├─ env_server.mjs          # episode 管理 + HTTP API + verl 工具约定
│  ├─ tasks.mjs               # v1 任务集（prompt + 目标 ops）
│  ├─ geometry_reward.mjs     # 几何奖励（体积/包围盒/Chamfer）
│  └─ tool_schemas.mjs        # cad_op / cad_state / cad_submit 定义
├─ demo/
│  └─ run_demo.mjs            # 端到端 demo（无 GPU / 无 verl）
└─ python/                    # verl 侧骨架（见 python/README.md）
```

## 快速开始

```sh
npm install && npm run build      # 环境依赖主仓库构建产物 lib/

# 1) 端到端 demo：三条轨迹（精确/偏差/空）+ verl 约定冒烟，应有 DEMO PASS
node rl/demo/run_demo.mjs

# 2) 常驻环境服务（训练/调试用）
node rl/server/env_server.mjs --port 8990

# 3) Python 随机策略基线（纯标准库）
python rl/python/scripts/random_rollout.py --url http://127.0.0.1:8990
```

当前实测：脚本化精确复现 reward=1.0000；单维偏差（dz 10→12）0.8048；
空场景 0；随机策略均值 ≈0.11。

## HTTP API（env server）

| 路由 | 说明 |
| --- | --- |
| `POST /reset` `{task_id?}` | 新 episode（新 worker）→ `{episode_id, prompt, tools}` |
| `POST /step` `{episode_id, name, arguments}` | 一次 agent 动作（cad_op/cad_state/cad_submit）→ `{observation, done, reward}` |
| `GET /episodes/:id`（`?mesh=1`） | episode 摘要 / 含最终网格（调试、回放渲染用） |
| `POST /initialize`、`POST /execute` | verl 自定义 tool server 约定（字段以所装 verl 版本为准，建议在 python 侧加薄适配层） |
| `GET /health`、`GET /tasks` | 探活、任务列表 |

达到 `max_steps`（默认 24）自动截断并按当前状态计分；op 报错返回错误
文本作为观测（episode 继续），worker 崩溃则 episode 以 reward=0 终止。

## Roadmap

- **v2 接通 verl**：按所装 verl 版本写 tool 请求适配层 + 生成
  `demo_prompts.parquet`，跑通 1.5B 级模型的 GRPO 小规模训练。
- **任务集扩充**：数据集驱动（prompt + 目标 ops / 目标 STEP），
  替换 `tasks.mjs` 内嵌任务；按难度分级做课程。
- **多模态观测**：`cad_image` 式离屏渲染工具（显式动作，进 MDP）。
- **工程化**：mesh 二进制传输（去 `Array.from`）、worker 池复用、
  多进程分片扩容、rollout 回放渲染工具。
