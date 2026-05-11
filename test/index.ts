import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { deepStrictEqual, ok } from 'node:assert/strict'

import * as yaml from 'js-yaml'
import { BufferGeometry } from 'three'

import {
  convertBufferGeometryToFaceVertexMesh,
  convertFaceVertexMeshToBufferGeometry,
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
  it('converts a face-vertex mesh to a three.js buffer-geometry', () => {
    const threeTetrahedron =
      convertFaceVertexMeshToBufferGeometry(faceVertexTetrahedron)

    ok(threeTetrahedron instanceof BufferGeometry)
  })

  it('converts a buffer-geometry to a face-vertex mesh', () => {
    const threeTetrahedron =
      convertFaceVertexMeshToBufferGeometry(faceVertexTetrahedron)

    const reconverted =
      convertBufferGeometryToFaceVertexMesh(threeTetrahedron)

    const expected: FaceVertexMesh = {
      vertexCoordinates: Array.from(
        new Float32Array(faceVertexTetrahedron.vertexCoordinates),
      ),
      faceVertexIndices: faceVertexTetrahedron.faceVertexIndices,
      faceNormalCoordinates: Array.from(
        new Float32Array(faceVertexTetrahedron.faceNormalCoordinates),
      ),
    }

    deepStrictEqual(reconverted, expected)
  })
})
