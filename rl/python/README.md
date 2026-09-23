# verl-side skeleton (rl/python)

This directory holds the training side (Python / verl). The environment lives
in `rl/server/` (Node, reusing the main repo's OCCT modeling kernel); the two
sides talk HTTP only — the training machine needs no Node dependencies, just
access to the env server.

## Layout

| Path | Purpose |
| --- | --- |
| `tools/cad_tools_schema.json` | OpenAI-format tool definitions exposed to the policy (`cad_op` / `cad_state` / `cad_submit`); manually mirrored from `rl/server/tool_schemas.mjs` — keep in sync when editing |
| `scripts/random_rollout.py` | random-policy smoke test (pure stdlib, no verl/GPU); gives a reward baseline |
| `configs/grpo_cad_demo.yaml` | verl GRPO config sketch (**verify key names against your installed verl version**) |

## Smoke flow (no verl needed)

```sh
# terminal 1: start the env server (requires npm install && npm run build)
node rl/server/env_server.mjs --port 8990

# terminal 2: python-side random rollout
python rl/python/scripts/random_rollout.py --url http://127.0.0.1:8990 --episodes 4
```

Expected: the random policy scores far below the scripted demo (exact rebuild
in `node rl/demo/run_demo.mjs` scores 1.0).

## Plugging into verl (v2 TODO)

The env server already exposes `/initialize` and `/execute` following verl's
custom tool-server HTTP convention. Request/response fields differ across
verl versions, so the recommended approach is a thin adapter in `rl/python/`
(forwarding verl's tool requests to the env server with field names aligned)
rather than bending the env server to one specific verl version.

Episode binding: `/execute` accepts an optional `episode_id`; in v1 smoke mode
it defaults to the episode of the most recent `/reset`. Real multi-environment
parallel rollouts should dispatch episodes per rollout request in the adapter
layer (one isolated OCCT worker per episode — already supported server-side).

Training data: the v1 task set is embedded in `rl/server/tasks.mjs`; v2 swaps
in dataset files (prompt + target ops / target STEP) and adds
`scripts/make_prompts.py` to generate the parquet.
