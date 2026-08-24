# -*- coding: utf-8 -*-
"""Generate the CAD editor demo examples as real OCCT BRep files.

Run with the local FreeCAD console:
  /Applications/FreeCAD.app/Contents/Resources/bin/freecadcmd scripts/make-demo-brep.py

Three common CAD parts, all Z-up and XY-centered:
- bracket: L-bracket, 60x60x12 legs, 100 mm extrusion, D10 through hole
- flange:  D80 disk x12 + D44 hub x34, D24 center bore, 6 x D7 bolt holes
- shaft:   stepped shaft D24x40 / D32x30 / D24x40, 8x4 keyway on the middle step
"""
import math
import os

import FreeCAD as App
import Part
from FreeCAD import Vector

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
ASSETS = os.path.normpath(os.path.join(ROOT, "assets"))
Z = Vector(0, 0, 1)


def build_bracket():
    base = Part.makeBox(60, 12, 100, Vector(-30, -30, 0))
    leg = Part.makeBox(12, 60, 100, Vector(-30, -30, 0))
    body = base.fuse(leg)
    hole = Part.makeCylinder(5, 102, Vector(6, -24, -1), Z)
    return body.cut(hole)


def build_flange():
    disk = Part.makeCylinder(40, 12, Vector(0, 0, 0), Z)
    hub = Part.makeCylinder(22, 34, Vector(0, 0, 0), Z)
    body = disk.fuse(hub)
    bore = Part.makeCylinder(12, 36, Vector(0, 0, -1), Z)
    body = body.cut(bore)
    for i in range(6):
        a = i * math.pi / 3
        bolt = Part.makeCylinder(3.5, 14, Vector(31 * math.cos(a), 31 * math.sin(a), -1), Z)
        body = body.cut(bolt)
    return body


def build_shaft():
    s1 = Part.makeCylinder(12, 40, Vector(0, 0, 0), Z)
    s2 = Part.makeCylinder(16, 30, Vector(0, 0, 40), Z)
    s3 = Part.makeCylinder(12, 40, Vector(0, 0, 70), Z)
    body = s1.fuse(s2).fuse(s3)
    # 8 wide x 4 deep keyway, 18 long, on the middle step (+Y side)
    key = Part.makeBox(8, 8, 18, Vector(-4, 12, 46))
    return body.cut(key)


def keyway_area():
    # Box x in [-4,4], y >= 12 inside circle r=16: integral of sqrt(256-x^2)-12.
    n = 200000
    h = 8.0 / n
    area = 0.0
    for i in range(n):
        x = -4 + (i + 0.5) * h
        area += (math.sqrt(256 - x * x) - 12) * h
    return area


PARTS = {
    "bracket": (build_bracket, (60 * 60 - 48 * 48 - math.pi * 25) * 100),
    "flange": (build_flange, math.pi * (40 ** 2 * 12 + 22 ** 2 * 22 - 12 ** 2 * 34) - 6 * math.pi * 3.5 ** 2 * 12),
    "shaft": (build_shaft, math.pi * 12 ** 2 * 80 + math.pi * 16 ** 2 * 30 - keyway_area() * 18),
}

os.makedirs(ASSETS, exist_ok=True)
for name, (build, expected) in PARTS.items():
    shape = build()
    print("%s: volume %.2f mm3 (expected %.2f, diff %.3f%%)"
          % (name, shape.Volume, expected, abs(shape.Volume - expected) / expected * 100))
    assert abs(shape.Volume - expected) / expected < 1e-3, "%s volume mismatch" % name
    out = os.path.join(ASSETS, "demo-%s.brep" % name)
    shape.exportBrep(out)
    print("  written:", out, os.path.getsize(out), "bytes")
