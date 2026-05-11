import { BufferAttribute, BufferGeometry } from 'three'

export interface FaceVertexMesh {
  vertexCoordinates: number[]
  faceVertexIndices: number[]
  faceNormalCoordinates: number[]
}

export function convertFaceVertexMeshToBufferGeometry(
  mesh: FaceVertexMesh,
): BufferGeometry {
  const geometry = new BufferGeometry()

  const positions = new Float32Array(mesh.vertexCoordinates)
  const indices = new Uint32Array(mesh.faceVertexIndices)
  const normals = new Float32Array(mesh.faceNormalCoordinates)

  geometry.setIndex(new BufferAttribute(indices, 1))
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new BufferAttribute(normals, 3))
  geometry.computeBoundingSphere()

  return geometry
}

export function convertBufferGeometryToFaceVertexMesh(
  geometry: BufferGeometry,
): FaceVertexMesh {
  const position = geometry.getAttribute('position')
  const normal = geometry.getAttribute('normal')
  const index = geometry.getIndex()

  if (!position) {
    throw new Error('BufferGeometry is missing a position attribute')
  }
  if (!normal) {
    throw new Error('BufferGeometry is missing a normal attribute')
  }
  if (!index) {
    throw new Error('BufferGeometry is missing an index')
  }

  return {
    vertexCoordinates: Array.from(position.array),
    faceVertexIndices: Array.from(index.array),
    faceNormalCoordinates: Array.from(normal.array),
  }
}
