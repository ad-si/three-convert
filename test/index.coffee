fs = require 'fs'
path = require 'path'

yaml = require 'js-yaml'
three = require 'three'

threeConverter = require '../source/index'


expect = require('chai').expect

faceVertexTetrahedron = yaml.safeLoad fs.readFileSync path.join(
	__dirname,
	'models/faceVertexTetrahedron.yaml'
)


describe 'Three Converter', ->
	it 'converts a face-vertex mesh to a three.js standard-geometry', () ->
		threeTetrahedron = threeConverter
		.convertFaceVertexMeshToGeometry faceVertexTetrahedron

		expect(threeTetrahedron).to.be.an.instanceof three.Geometry


	it 'converts a face-vertex mesh to a three.js buffer-geometry', () ->
		threeTetrahedron = threeConverter
		.convertFaceVertexMeshToBufferGeometry faceVertexTetrahedron

		expect(threeTetrahedron).to.be.an.instanceof three.BufferGeometry


	it 'converts a three-geometry to a face-vertex mesh', () ->
		threeTetrahedron = threeConverter
		.convertFaceVertexMeshToGeometry faceVertexTetrahedron

		reconvertedFaceVertexTetrahedron = threeConverter
		.convertGeometryTofaceVertexMesh threeTetrahedron

		expect(reconvertedFaceVertexTetrahedron)
		.to.be.deep.equal faceVertexTetrahedron
