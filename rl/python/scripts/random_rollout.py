#!/usr/bin/env python3
"""Random-rollout smoke test against the headless CAD env server.

Stdlib only — no verl, no torch, no GPU. Its job is to prove the HTTP
interface works from Python (the language the verl rollout lives in) and to
give a reward baseline: a random policy scores far below the scripted demo.

Usage:
    node rl/server/env_server.mjs --port 8990          # terminal 1
    python rl/python/scripts/random_rollout.py \
        --url http://127.0.0.1:8990 --episodes 4 --steps 6
"""
import argparse
import json
import random
import sys
import urllib.request


def post(url: str, payload: dict) -> dict:
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"content-type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode("utf-8"))


def random_op(rng: random.Random, step: int, body_ids: list[str]) -> dict:
    """A very naive policy: mostly throw primitives with random dims."""
    body_id = f"b{step}"
    body_ids.append(body_id)
    prim = rng.choice(["box", "cylinder", "sphere"])
    params = {}
    if prim == "box":
        params = {"dx": rng.uniform(5, 60), "dy": rng.uniform(5, 60), "dz": rng.uniform(5, 60)}
    elif prim == "cylinder":
        params = {"radius": rng.uniform(2, 15), "height": rng.uniform(5, 40)}
    else:
        params = {"radius": rng.uniform(3, 20)}
    return {"kind": "create_prim", "bodyId": body_id, "prim": prim, "params": params}


def run_episode(base: str, task_id: str, steps: int, rng: random.Random) -> dict:
    started = post(f"{base}/reset", {"task_id": task_id})
    episode_id = started["episode_id"]
    body_ids: list[str] = []
    for step in range(steps):
        result = post(
            f"{base}/step",
            {"episode_id": episode_id, "name": "cad_op", "arguments": {"op": random_op(rng, step, body_ids)}},
        )
        if result.get("done"):
            return result
    return post(f"{base}/step", {"episode_id": episode_id, "name": "cad_submit"})


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default="http://127.0.0.1:8990")
    parser.add_argument("--episodes", type=int, default=4)
    parser.add_argument("--steps", type=int, default=6)
    parser.add_argument("--seed", type=int, default=0)
    args = parser.parse_args()

    with urllib.request.urlopen(f"{args.url}/tasks", timeout=30) as resp:
        tasks = json.loads(resp.read().decode("utf-8"))["tasks"]

    rng = random.Random(args.seed)
    rewards = []
    for i in range(args.episodes):
        task = tasks[i % len(tasks)]
        result = run_episode(args.url, task["id"], args.steps, rng)
        detail = result.get("reward_detail") or {}
        rewards.append(result.get("reward") or 0.0)
        print(
            f"[{i + 1}/{args.episodes}] {task['id']:<24} reward={rewards[-1]:.4f} "
            f"(vol={detail.get('volume_ratio')} iou={detail.get('bbox_iou')} chamfer={detail.get('chamfer')})"
        )
    mean = sum(rewards) / len(rewards) if rewards else 0.0
    print(f"mean reward (random policy): {mean:.4f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
