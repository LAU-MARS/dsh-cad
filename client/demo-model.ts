/**
 * The demo example loaded into the CAD editor on startup: an L-bracket
 * (100 mm extrusion, 60×60×12 legs, ⌀10 through hole in the base leg) —
 * the same part family the README models live. Planar faces plus circular
 * hole edges make the face + edge render modes immediately readable.
 */
import * as THREE from 'three'

/** L-bracket profile extruded along +Z; origin centered in XY, z ∈ [0, 100]. */
export function demoBracketGeometry(): THREE.ExtrudeGeometry {
  const profile = new THREE.Shape()
  profile.moveTo(0, 0)
  profile.lineTo(60, 0)
  profile.lineTo(60, 12)
  profile.lineTo(12, 12)
  profile.lineTo(12, 60)
  profile.lineTo(0, 60)
  profile.closePath()

  const hole = new THREE.Path()
  hole.absarc(36, 6, 5, 0, Math.PI * 2, true)
  profile.holes.push(hole)

  const geometry = new THREE.ExtrudeGeometry(profile, {
    depth: 100,
    bevelEnabled: false,
    curveSegments: 32,
  })
  geometry.translate(-30, -30, 0)
  return geometry
}

/** Bounding hint for camera placement (mm). */
export const DEMO_BOUNDS = { min: { x: -30, y: -30, z: 0 }, max: { x: 30, y: 30, z: 100 } }
