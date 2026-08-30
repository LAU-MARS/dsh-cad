// DshCadBridge — SolidWorks executor demo (Windows).
//
// The GeometryExecutor contract on the Windows side: same op program the
// FreeCAD/Fusion bridges consume. This console app reads ops.json, drives
// SolidWorks through COM Interop (SldWorks.Application), tessellates the
// bodies, and writes result.json — the exact spool shape dsh-cad expects.
//
// Status: DEMO SCAFFOLD — written blind (no Windows machine at authoring
// time). Verify COM behaviors and the IModeler/IBody2 surfaces on first use.
//
// Build (needs Windows + SolidWorks installed):
//   dotnet new console -n DshCadBridge && copy this file over Program.cs
//   Add COM references:  SldWorks 20xx Type Library / SolidWorks Interop
//   (or nuget SolidWorks.Interop.sldworks) then:
//   dotnet build -c Release
//
// Run (same contract as the FreeCAD bridge):
//   DshCadBridge.exe <work-dir>          // expects <work-dir>/ops.json
//                                        // writes  <work-dir>/result.json
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Text.Json;

// Adjust to your SolidWorks interop packaging.
using SldWorks;
using SWConst;

class DshCadBridge
{
    static int Main(string[] args)
    {
        if (args.Length < 1) { Console.Error.WriteLine("usage: DshCadBridge <work-dir>"); return 2; }
        var dir = args[0];
        var opsPath = Path.Combine(dir, "ops.json");
        var resultPath = Path.Combine(dir, "result.json");

        try
        {
            var program = JsonSerializer.Deserialize<Program>(File.ReadAllText(opsPath));
            var result = Run(program);
            File.WriteAllText(resultPath, JsonSerializer.Serialize(result));
            Console.WriteLine("###DSH-OK###");
            return 0;
        }
        catch (Exception error)
        {
            File.WriteAllText(resultPath, JsonSerializer.Serialize(new BridgeResult
            {
                Ok = false,
                Error = error.Message,
                Trace = error.ToString(),
            }));
            Console.WriteLine("###DSH-ERR###");
            return 1;
        }
    }

    static BridgeResult Run(Program program)
    {
        var sw = (ISldWorks)Activator.CreateInstance(
            Type.GetTypeFromProgID("SldWorks.Application") ?? throw new InvalidOperationException("SolidWorks is not installed"));
        sw.Visible = program.Display; // the GUI doubles as a viewer

        var model = (IModelDoc2)sw.NewDocument(
            sw.GetUserPreferenceStringValue((int)swUserPreferenceStringValue_e.swDefaultTemplatePart),
            0, 0, 0) ?? throw new InvalidOperationException("no part template — create a default part template once");

        var bodies = new Dictionary<string, IBody2>();
        var volumes = new Dictionary<string, double>();

        foreach (var op in program.Ops)
        {
            switch (op.Kind)
            {
                case "reset":
                    bodies.Clear();
                    break;

                case "create_prim":
                    bodies[op.BodyId] = CreatePrim(model, op.Prim, op.Params);
                    break;

                case "boolean":
                    var target = bodies[op.Target];
                    foreach (var toolId in op.Tools)
                    {
                        // IBody2::Operations2: 0 = add(fuse) swBODYADD, 1 = cut, 2 = intersect
                        var tool = bodies[toolId];
                        var swBodyOp = op.Op switch { "cut" => 1, "common" => 2, _ => 0 };
                        var resultBody = (IBody2)target.Operations2(swBodyOp, tool, out int _);
                        bodies[op.Target] = resultBody ?? target;
                        bodies.Remove(toolId);
                    }
                    break;

                case "transform":
                    var body = bodies[op.Target];
                    if (op.Translate != null)
                    {
                        var m = (MathTransform)model.MathTransform;
                        // TODO: build translation/rotation matrices via IMathUtility
                    }
                    // Verify IMathUtility matrix composition on first live run.
                    break;

                case "volume":
                    volumes[op.Target] = bodies[op.Target].GetMassProperties2(0.0, out short _, out double _);
                    break;

                case "delete":
                    bodies.Remove(op.Target);
                    break;

                default:
                    throw new ArgumentException($"unsupported op: {op.Kind}");
            }
        }

        var names = program.Names ?? new Dictionary<string, string>();
        var meshes = bodies.Select(pair => Tessellate(pair.Key, names.GetValueOrDefault(pair.Key, pair.Key), pair.Value)).ToList();

        var result = new BridgeResult { Ok = true, Meshes = meshes, Volumes = volumes };

        if (program.Export != null && meshes.Count > 0)
        {
            var ext = Path.GetExtension(program.Export.Path).ToLowerInvariant();
            // STEP export: model.Extension.SaveAs3 with stp setting name;
            // STL: model.SaveAs3 picks by extension.
            model.Extension.SaveAs3(program.Export.Path, 0, 1, null, null, out object _,
                out object _, out object _, out int _);
            result.Exported = program.Export.Path;
        }

        return result;
    }

    static IBody2 CreatePrim(IModelDoc2 model, string prim, Dictionary<string, JsonElement> p)
    {
        var modeler = (IModeler)model.GetModeler();
        double Num(string key, double fallback) =>
            p != null && p.TryGetValue(key, out var v) ? v.GetDouble() : fallback;

        switch (prim)
        {
            case "box":
                // IModeler::CreateBodyFromBox3 with a coordinate-safe box body
                // — verify the exact overload on first live run.
                var box = modeler.CreateBodyFromBox3(null /* IMathPoint / safe array per docs */);
                return (IBody2)box;
            case "cylinder":
                return (IBody2)modeler.CreateBodyFromCyl(
                    new double[] { 0, 0, 0, 0, 0, Num("height", 10), Num("radius", 5) });
            default:
                throw new ArgumentException($"primitive '{prim}' not implemented in the demo bridge yet");
        }
    }

    static BridgeMesh Tessellate(string bodyId, string name, IBody2 body)
    {
        // IBody2::GetTessTriangles(true /*coincident vertices merged*/) returns
        // a safe array of doubles: 9 per triangle. Verify packing on first run.
        var tri = (double[])body.GetTessTriangles(true);
        var positions = new List<double>();
        var indices = new List<int>();
        var normals = new List<double>();
        int vertex = 0;
        for (int i = 0; i < tri.Length; i += 9)
        {
            var a = new Vector3((float)tri[i], (float)tri[i + 1], (float)tri[i + 2]);
            var b = new Vector3((float)tri[i + 3], (float)tri[i + 4], (float)tri[i + 5]);
            var c = new Vector3((float)tri[i + 6], (float)tri[i + 7], (float)tri[i + 8]);
            var n = Vector3.Normalize(Vector3.Cross(b - a, c - a));
            positions.AddRange(new[] { a.X, a.Y, a.Z, b.X, b.Y, b.Z, c.X, c.Y, c.Z });
            normals.AddRange(new[] { n.X, n.Y, n.Z, n.X, n.Y, n.Z, n.X, n.Y, n.Z });
            indices.AddRange(new[] { vertex, vertex + 1, vertex + 2 });
            vertex += 3;
        }
        return new BridgeMesh
        {
            BodyId = bodyId,
            Name = name,
            Positions = positions,
            Normals = normals,
            Indices = indices.Select(i => (uint)i).ToList(),
            VertexCount = vertex,
            TriangleCount = indices.Count / 3,
        };
    }
}

// ── JSON spool shapes (mirror src/cad_connector/executor.ts) ────────────────

public class Program
{
    public List<Op> Ops { get; set; } = new();
    public Dictionary<string, string> Names { get; set; }
    public ExportSpec Export { get; set; }
    public bool Display { get; set; }
}

public class Op
{
    public string Kind { get; set; }
    public string BodyId { get; set; }
    public string Prim { get; set; }
    public Dictionary<string, JsonElement> Params { get; set; }
    public string Op2 { get; set; }           // boolean discriminator ("op" in JSON)
    public string Target { get; set; }
    public List<string> Tools { get; set; }
    public List<double> Translate { get; set; }
    public string Path { get; set; }
}

public class ExportSpec
{
    public string Format { get; set; }
    public string Path { get; set; }
}

public class BridgeMesh
{
    public string BodyId { get; set; }
    public string Name { get; set; }
    public List<double> Positions { get; set; }
    public List<double> Normals { get; set; }
    public List<uint> Indices { get; set; }
    public int VertexCount { get; set; }
    public int TriangleCount { get; set; }
}

public class BridgeResult
{
    public bool Ok { get; set; }
    public string Error { get; set; }
    public string Trace { get; set; }
    public List<BridgeMesh> Meshes { get; set; }
    public Dictionary<string, double> Volumes { get; set; }
    public string Exported { get; set; }
}
