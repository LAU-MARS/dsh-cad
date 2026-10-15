# rl/ — agentic RL workspace (verl)

Training-side code on the `verl` branch. The environment itself is a headless
CAD modeling environment that reuses the main repo's OCCT kernel
(`lib/modeling/client.js` → `createModelClient()`) and serves it over HTTP;
the training side (Python / verl) never touches Node.

## Design notes

- **Headless is a hard constraint**: no web UI, no scene store, no viewer
  route. The MDP is exactly `prompt → tool call → text observation`, and
  reward is computed environment-side from the final tessellation. Rendering
  stays out of the loop (a v2 multimodal observation would join as an explicit
  `cad_image`-style tool the agent chooses to call).
- **One episode = one isolated OCCT worker** (`worker_threads`). Episodes
  share nothing and never replay: reset is a fresh worker, and a crash kills
  only that episode (terminated with reward=0, the training process survives).
  This deliberately bypasses the main branch's "one shared worker per process
  + cross-session replay" architecture — fine for interactive use, wrong for
  parallel rollouts.
- **The target is the kernel**: v1 task target meshes are produced by the
  same kernel running the same ops (cached per process), so a perfect rebuild
  scores reward=1.0 (chamfer exactly 0) with no external dataset.
- **reward = 0.4·volume ratio + 0.3·bbox IoU + 0.3·exp(-chamfer/scale)**,
  pure JS with deterministic seeded sampling; components are logged per
  episode for training diagnostics.

## Layout

```
rl/
├─ server/                    # environment (Node, headless)
│  ├─ env_server.mjs          # episode management + HTTP API + verl tool convention
│  ├─ tasks.mjs               # v1 task set (prompt + target ops)
│  ├─ geometry_reward.mjs     # geometric reward (volume/bbox/Chamfer)
│  └─ tool_schemas.mjs        # cad_op / cad_state / cad_submit definitions
├─ demo/
│  └─ run_demo.mjs            # end-to-end demo (no GPU / no verl)
└─ python/                    # verl-side skeleton (see python/README.md)
```

## Quick start

```sh
npm install && npm run build      # the env depends on the main repo's lib/ build

# 1) End-to-end demo: three trajectories (exact / off / empty) + verl
#    convention smoke — should print DEMO PASS
node rl/demo/run_demo.mjs

# 2) Long-running env server (for training / debugging)
node rl/server/env_server.mjs --port 8990

# 3) Python random-policy baseline (stdlib only)
python rl/python/scripts/random_rollout.py --url http://127.0.0.1:8990
```

Current measured numbers: scripted exact rebuild reward=1.0000; single-dimension
error (dz 10→12) 0.8048; empty scene 0; random policy mean ≈0.11.

## HTTP API (env server)

| Route | Description |
| --- | --- |
| `POST /reset` `{task_id?}` | new episode (new worker) → `{episode_id, prompt, tools}` |
| `POST /step` `{episode_id, name, arguments}` | one agent action (cad_op/cad_state/cad_submit) → `{observation, done, reward}` |
| `GET /episodes/:id` (`?mesh=1`) | episode summary / with final meshes (debugging, replay rendering) |
| `POST /initialize`, `POST /execute` | verl custom tool-server convention (field names depend on the installed verl version; prefer a thin adapter on the python side) |
| `GET /health`, `GET /tasks` | liveness, task list |

Reaching `max_steps` (default 24) auto-truncates and scores the current state;
a failed op returns the error text as the observation (the episode continues),
while a worker crash terminates the episode with reward=0.

## Roadmap

- **v2 wire up verl**: a tool-request adapter for the installed verl version
  + generate `demo_prompts.parquet`, then run a small-scale GRPO on a ~1.5B model.
- **Task set growth**: dataset-driven (prompt + target ops / target STEP),
  replacing the embedded `tasks.mjs` tasks; difficulty tiers for curriculum.
- **Multimodal observations**: an offscreen-rendering `cad_image`-style tool
  (an explicit action, inside the MDP).
- **Engineering**: binary mesh transport (drop `Array.from`), worker pooling,
  multi-process sharding, rollout replay rendering.
