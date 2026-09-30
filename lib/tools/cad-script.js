/**
 * The `cad_script` tool: deterministic script evaluation for geometry math —
 * generating profile point arrays, arc coordinates, transform matrices —
 * without a CAD kernel round-trip.
 *
 * `language: "js"` runs in-process (Node vm, no child process), which keeps
 * it usable in hosts whose shell tool is sandboxed or broken — the desktop
 * runtime's pwsh can fail outright (exit 0xC0000142), leaving this as the
 * only execution path. `language: "py"` uses a system Python interpreter
 * when the host permits spawning one.
 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { defineTool } from '@deepseek-ai/dsh-tools';
const JS_DEFAULT_TIMEOUT = 10_000;
const PY_DEFAULT_TIMEOUT = 30_000;
const TIMEOUT_CAP = 120_000;
const OUTPUT_CAP = 20_000;
function clampTimeout(value, fallback) {
    const n = typeof value === 'number' && Number.isFinite(value) ? value : fallback;
    return Math.min(Math.max(Math.trunc(n), 100), TIMEOUT_CAP);
}
function truncate(text) {
    return text.length > OUTPUT_CAP ? `${text.slice(0, OUTPUT_CAP)}\n… (truncated at ${OUTPUT_CAP} chars)` : text;
}
function formatValue(value) {
    if (typeof value === 'string')
        return value;
    try {
        return JSON.stringify(value) ?? String(value);
    }
    catch {
        return String(value);
    }
}
/** Evaluate synchronous JavaScript in a fresh vm realm; no require/process. */
function evalJs(code, timeoutMs) {
    const lines = [];
    const push = (...values) => lines.push(values.map(formatValue).join(' '));
    const context = vm.createContext({
        console: { log: push, info: push, warn: push, error: push, debug: push },
    });
    let completion;
    try {
        completion = vm.runInContext(code, context, { timeout: timeoutMs });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { ok: false, stdout: truncate(lines.join('\n')), error: message };
    }
    // Thenable check instead of instanceof Promise: the vm realm has its own
    // Promise class, so realm-crossing promises fail instanceof.
    if (completion !== undefined && completion !== null && typeof completion.then === 'function') {
        return { ok: false, stdout: truncate(lines.join('\n')), error: 'asynchronous completion value — keep the script synchronous (no await)' };
    }
    const outcome = { ok: true, stdout: truncate(lines.join('\n')) };
    if (completion !== undefined) {
        try {
            outcome.resultJson = JSON.stringify(completion);
        }
        catch {
            outcome.resultJson = String(completion);
        }
    }
    return outcome;
}
let cachedPython;
/** Probe for a system Python once; null when none is installed/runnable. */
function findPython() {
    if (cachedPython !== undefined)
        return cachedPython;
    const candidates = [
        { cmd: 'python', args: [] },
        { cmd: 'py', args: ['-3'] },
        { cmd: 'python3', args: [] },
    ];
    for (const candidate of candidates) {
        try {
            const probe = spawnSync(candidate.cmd, [...candidate.args, '--version'], { timeout: 5_000 });
            if (probe.error === undefined && probe.status === 0) {
                cachedPython = candidate;
                return candidate;
            }
        }
        catch {
            /* spawn blocked entirely — try the next candidate */
        }
    }
    cachedPython = null;
    return null;
}
/** Run a Python script file, capturing stdout/stderr with a hard timeout. */
async function evalPy(code, timeoutMs, workspaceRoot) {
    const python = findPython();
    if (python === null) {
        return {
            ok: false,
            stdout: '',
            error: 'no runnable Python interpreter (python / py / python3 all failed to launch — the host may be blocking process creation). ' +
                'Retry with language: "js", which runs in-process.',
        };
    }
    const dir = path.join(workspaceRoot, '.dsh-cad', 'tmp');
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `eval-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.py`);
    await writeFile(file, code, 'utf8');
    try {
        return await new Promise((resolve) => {
            let child;
            try {
                child = spawn(python.cmd, [...python.args, file], { cwd: workspaceRoot });
            }
            catch (error) {
                resolve({ ok: false, stdout: '', error: `failed to launch ${python.cmd}: ${error instanceof Error ? error.message : String(error)} — retry with language: "js"` });
                return;
            }
            let stdout = '';
            let stderr = '';
            child.stdout.on('data', (chunk) => {
                if (stdout.length < OUTPUT_CAP)
                    stdout += chunk.toString('utf8');
            });
            child.stderr.on('data', (chunk) => {
                if (stderr.length < OUTPUT_CAP)
                    stderr += chunk.toString('utf8');
            });
            const timer = setTimeout(() => {
                child.kill();
                resolve({ ok: false, stdout: truncate(stdout), stderr: truncate(stderr), error: `python timed out after ${timeoutMs} ms` });
            }, timeoutMs);
            child.on('error', (error) => {
                clearTimeout(timer);
                resolve({ ok: false, stdout: truncate(stdout), error: `failed to launch ${python.cmd}: ${error.message} — retry with language: "js"` });
            });
            child.on('close', (code2, signal) => {
                clearTimeout(timer);
                if (code2 === 0) {
                    resolve({ ok: true, stdout: truncate(stdout), ...(stderr !== '' ? { stderr: truncate(stderr) } : {}) });
                }
                else {
                    resolve({
                        ok: false,
                        stdout: truncate(stdout),
                        stderr: truncate(stderr),
                        error: `python exited with code ${String(code2)}${signal === null ? '' : ` (signal ${signal})`}`,
                    });
                }
            });
        });
    }
    finally {
        await rm(file, { force: true });
    }
}
/** Build the cad_script tool definition. */
export function createCadScriptTool(deps) {
    return defineTool({
        name: 'cad_script',
        description: 'Evaluate a short script for deterministic geometry math (profile point arrays, arc coordinates, transform math) — no CAD ' +
            'kernel involved. language "js" runs in-process (Node vm; no shell or child process needed, so it works even when the host ' +
            'shell tool is unavailable); the script must be synchronous, its completion value (last expression) is returned as resultJson, ' +
            'and console.log output is captured. language "py" runs a system Python interpreter (python / py -3 / python3) and captures ' +
            'stdout/stderr. Prefer this over the host shell for numeric work.',
        parameters: {
            language: {
                type: 'string',
                required: true,
                enum: ['js', 'py'],
                description: 'Script language: "js" (in-process Node vm, always available) or "py" (system Python).',
            },
            code: {
                type: 'string',
                required: true,
                description: 'Script source. js: synchronous, completion value (last expression) becomes resultJson. py: use print() for output.',
            },
            timeoutMs: {
                type: 'number',
                description: `Execution timeout in ms (default ${JS_DEFAULT_TIMEOUT} for js, ${PY_DEFAULT_TIMEOUT} for py; capped at ${TIMEOUT_CAP}).`,
            },
        },
        output: {
            schema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    ok: { type: 'boolean', required: true },
                    language: { type: 'string', required: true },
                    resultJson: { type: 'string', description: 'JSON-stringified completion value (js only, when defined).' },
                    stdout: { type: 'string', required: true, description: 'Captured console.log (js) or stdout (py).' },
                    stderr: { type: 'string', description: 'Captured stderr (py only, when non-empty).' },
                    error: { type: 'string', description: 'Failure reason when ok is false.' },
                },
            },
            render: (_args, value) => {
                const lines = [`eval (${value.language}) — ${value.ok ? 'ok' : 'failed'}`];
                if (value.resultJson !== undefined)
                    lines.push(`result: ${value.resultJson}`);
                if (value.stdout !== '')
                    lines.push(value.stdout);
                if (value.stderr !== undefined)
                    lines.push(`stderr: ${value.stderr}`);
                if (value.error !== undefined)
                    lines.push(`error: ${value.error}`);
                return [{ type: 'text', text: lines.join('\n') }];
            },
        },
        timeoutMs: TIMEOUT_CAP + 15_000,
        isConcurrencySafe: () => true,
        async execute(args) {
            const timeoutMs = clampTimeout(args.timeoutMs, args.language === 'py' ? PY_DEFAULT_TIMEOUT : JS_DEFAULT_TIMEOUT);
            const outcome = args.language === 'py' ? await evalPy(args.code, timeoutMs, deps.workspaceRoot) : evalJs(args.code, timeoutMs);
            return {
                ok: outcome.ok,
                language: args.language,
                ...(outcome.resultJson === undefined ? {} : { resultJson: outcome.resultJson }),
                stdout: outcome.stdout,
                ...(outcome.stderr === undefined ? {} : { stderr: outcome.stderr }),
                ...(outcome.error === undefined ? {} : { error: outcome.error }),
            };
        },
        presentCall: (args) => ({ card: 'generic', title: `CAD script (${String(args.language)})`, kind: 'other' }),
        presentResult: () => ({ card: 'generic', title: 'CAD script' }),
    });
}
