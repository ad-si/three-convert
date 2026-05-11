import * as fs from 'fs'
import * as path from 'path'

import * as yaml from 'js-yaml'
import * as three from 'three'
import { expect } from 'chai'

import threeConverter, { FaceVertexMesh } from '../source/index'

const faceVertexTetrahedron = yaml.load(
  fs.readFileSync(
    path.join(__dirname, 'models/faceVertexTetrahedron.yaml'),
    'utf8',
  ),
) as FaceVertexMesh

describe('Three Converter', () => {
  it('converts a face-vertex mesh to a three.js standard-geometry', () => {
    const threeTetrahedron = threeConverter
      .convertFaceVertexMeshToGeometry(faceVertexTetrahedron)

    expect(threeTetrahedron).to.be.an.instanceof(three.Geometry)
  })

  it('converts a face-vertex mesh to a three.js buffer-geometry', () => {
    const threeTetrahedron = threeConverter
      .convertFaceVertexMeshToBufferGeometry(faceVertexTetrahedron)

    expect(threeTetrahedron).to.be.an.instanceof(three.BufferGeometry)
  })

  it('converts a three-geometry to a face-vertex mesh', () => {
    const threeTetrahedron = threeConverter
      .convertFaceVertexMeshToGeometry(faceVertexTetrahedron)

    const reconvertedFaceVertexTetrahedron = threeConverter
      .convertGeometryTofaceVertexMesh(threeTetrahedron)

    expect(reconvertedFaceVertexTetrahedron)
      .to.be.deep.equal(faceVertexTetrahedron)
  })
})
