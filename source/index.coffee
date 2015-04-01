three = require 'three'
threeConvert = {}


threeConvert.convertFaceVertexMeshToGeometry = (mesh) ->
	geometry = new three.Geometry()

	for vi in [0..mesh.vertexCoordinates.length - 1] by 3
		geometry.vertices.push new three.Vector3(
			mesh.vertexCoordinates[vi],
			mesh.vertexCoordinates[vi + 1],
			mesh.vertexCoordinates[vi + 2]
		)

	for fi in [0..mesh.faceVertexIndices.length - 1] by 3
		geometry.faces.push new three.Face3(
			mesh.faceVertexIndices[fi],
			mesh.faceVertexIndices[fi + 1],
			mesh.faceVertexIndices[fi + 2],
			new three.Vector3(
				mesh.faceNormalCoordinates[fi],
				mesh.faceNormalCoordinates[fi + 1],
				mesh.faceNormalCoordinates[fi + 2]
			)
		)

	return geometry


threeConvert.convertFaceVertexMeshToBufferGeometry = (mesh) ->
	geometry = new three.BufferGeometry()

	parray = new Float32Array(mesh.vertexCoordinates.length)
	for i in [0..mesh.vertexCoordinates.length - 1]
		parray[i] = mesh.vertexCoordinates[i]

	iarray = new Uint32Array(mesh.faceVertexIndices.length)
	for i in [0..mesh.faceVertexIndices.length - 1]
		iarray[i] = mesh.faceVertexIndices[i]

	narray = new Float32Array(mesh.faceNormalCoordinates.length)
	for i in [0..mesh.faceNormalCoordinates.length - 1]
		narray[i] = mesh.faceNormalCoordinates[i]

	geometry.addAttribute 'index', new three.BufferAttribute(iarray, 1)
	geometry.addAttribute 'position', new three.BufferAttribute(parray, 3)
	geometry.addAttribute 'normal', new three.BufferAttribute(narray, 3)
	geometry.computeBoundingSphere()

	return geometry


threeConvert.convertGeometryTofaceVertexMesh = (threeGeometry, fileName) =>
	fileName ?= 'three.geometry'

	mesh = {
		vertexCoordinates: []
		faceVertexIndices: []
		faceNormalCoordinates: []
	}

	for vertex in threeGeometry.vertices
		mesh.vertexCoordinates.push vertex.x
		mesh.vertexCoordinates.push vertex.y
		mesh.vertexCoordinates.push vertex.z

	# Convert faces and their normals
	for face in threeGeometry.faces
		mesh.faceVertexIndices.push face.a
		mesh.faceVertexIndices.push face.b
		mesh.faceVertexIndices.push face.c

		mesh.faceNormalCoordinates.push face.normal.x
		mesh.faceNormalCoordinates.push face.normal.y
		mesh.faceNormalCoordinates.push face.normal.z

	return mesh

module.exports = threeConvert