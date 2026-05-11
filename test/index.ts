import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { deepStrictEqual, ok } from 'node:assert/strict'

import * as yaml from 'js-yaml'
import three from 'three'

import {
  convertFaceVertexMeshToBufferGeometry,
  convertFaceVertexMeshToGeometry,
  convertGeometryTofaceVertexMesh,
  type FaceVertexMesh,
} from '../source/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const faceVertexTetrahedron = yaml.load(
  readFileSync(
    join(__dirname, 'models/faceVertexTetrahedron.yaml'),
    'utf8',
  ),
) as FaceVertexMesh

describe('Three Converter', () => {
  it('converts a face-vertex mesh to a three.js standard-geometry', () => {
    const threeTetrahedron =
      convertFaceVertexMeshToGeometry(faceVertexTetrahedron)

    ok(threeTetrahedron instanceof three.Geometry)
  })

  it('converts a face-vertex mesh to a three.js buffer-geometry', () => {
    const threeTetrahedron =
      convertFaceVertexMeshToBufferGeometry(faceVertexTetrahedron)

    ok(threeTetrahedron instanceof three.BufferGeometry)
  })

  it('converts a three-geometry to a face-vertex mesh', () => {
    const threeTetrahedron =
      convertFaceVertexMeshToGeometry(faceVertexTetrahedron)

    const reconvertedFaceVertexTetrahedron =
      convertGeometryTofaceVertexMesh(threeTetrahedron)

    deepStrictEqual(reconvertedFaceVertexTetrahedron, faceVertexTetrahedron)
  })
})
