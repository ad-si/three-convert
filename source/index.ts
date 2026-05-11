import three from 'three'

export interface FaceVertexMesh {
  vertexCoordinates: number[]
  faceVertexIndices: number[]
  faceNormalCoordinates: number[]
}

export function convertFaceVertexMeshToGeometry(
  mesh: FaceVertexMesh,
): three.Geometry {
  const geometry = new three.Geometry()

  for (let vi = 0; vi < mesh.vertexCoordinates.length; vi += 3) {
    geometry.vertices.push(new three.Vector3(
      mesh.vertexCoordinates[vi],
      mesh.vertexCoordinates[vi + 1],
      mesh.vertexCoordinates[vi + 2],
    ))
  }

  for (let fi = 0; fi < mesh.faceVertexIndices.length; fi += 3) {
    geometry.faces.push(new three.Face3(
      mesh.faceVertexIndices[fi],
      mesh.faceVertexIndices[fi + 1],
      mesh.faceVertexIndices[fi + 2],
      new three.Vector3(
        mesh.faceNormalCoordinates[fi],
        mesh.faceNormalCoordinates[fi + 1],
        mesh.faceNormalCoordinates[fi + 2],
      ),
    ))
  }

  return geometry
}

export function convertFaceVertexMeshToBufferGeometry(
  mesh: FaceVertexMesh,
): three.BufferGeometry {
  const geometry = new three.BufferGeometry()

  const parray = new Float32Array(mesh.vertexCoordinates.length)
  for (let i = 0; i < mesh.vertexCoordinates.length; i++) {
    parray[i] = mesh.vertexCoordinates[i]
  }

  const iarray = new Uint32Array(mesh.faceVertexIndices.length)
  for (let i = 0; i < mesh.faceVertexIndices.length; i++) {
    iarray[i] = mesh.faceVertexIndices[i]
  }

  const narray = new Float32Array(mesh.faceNormalCoordinates.length)
  for (let i = 0; i < mesh.faceNormalCoordinates.length; i++) {
    narray[i] = mesh.faceNormalCoordinates[i]
  }

  geometry.addAttribute('index', new three.BufferAttribute(iarray, 1))
  geometry.addAttribute('position', new three.BufferAttribute(parray, 3))
  geometry.addAttribute('normal', new three.BufferAttribute(narray, 3))
  geometry.computeBoundingSphere()

  return geometry
}

export function convertGeometryTofaceVertexMesh(
  threeGeometry: three.Geometry,
): FaceVertexMesh {
  const mesh: FaceVertexMesh = {
    vertexCoordinates: [],
    faceVertexIndices: [],
    faceNormalCoordinates: [],
  }

  for (const vertex of threeGeometry.vertices) {
    mesh.vertexCoordinates.push(vertex.x)
    mesh.vertexCoordinates.push(vertex.y)
    mesh.vertexCoordinates.push(vertex.z)
  }

  for (const face of threeGeometry.faces) {
    mesh.faceVertexIndices.push(face.a)
    mesh.faceVertexIndices.push(face.b)
    mesh.faceVertexIndices.push(face.c)

    mesh.faceNormalCoordinates.push(face.normal.x)
    mesh.faceNormalCoordinates.push(face.normal.y)
    mesh.faceNormalCoordinates.push(face.normal.z)
  }

  return mesh
}
