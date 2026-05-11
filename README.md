# Three Convert

Convert JSON-based 3D model representations to
[three.js] geometries and vice versa.

[three.js]: https://threejs.org/

The package exposes two converters between a plain face-vertex mesh
(a JSON-friendly structure of flat number arrays) and a three.js
[`BufferGeometry`]. It is useful when loading meshes from a JSON/YAML
file, an HTTP API, or any data source that cannot ship a
`BufferGeometry` directly.

[`BufferGeometry`]: https://threejs.org/docs/#api/en/core/BufferGeometry


## Installation

```sh
npm install three-convert
```

`three` is a peer of this package — make sure it is installed in the
host project.


## Usage

```ts
import {
  convertFaceVertexMeshToBufferGeometry,
  convertBufferGeometryToFaceVertexMesh,
  type FaceVertexMesh,
} from 'three-convert'

const tetrahedron: FaceVertexMesh = {
  vertexCoordinates: [
    0, 0, 0,
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ],
  faceVertexIndices: [
    1, 2, 3,
    0, 1, 3,
    0, 3, 2,
    0, 2, 1,
  ],
  faceNormalCoordinates: [
    0.57735027, 0.57735027, 0.57735027,
    0, -1, 0,
    -1, 0, 0,
    0, 0, -1,
  ],
}

const geometry = convertFaceVertexMeshToBufferGeometry(tetrahedron)
const mesh = convertBufferGeometryToFaceVertexMesh(geometry)
```


## API

### `FaceVertexMesh`

```ts
interface FaceVertexMesh {
  vertexCoordinates: number[]      // flat (x, y, z) triples
  faceVertexIndices: number[]      // flat triples indexing vertices
  faceNormalCoordinates: number[]  // flat (x, y, z) normal triples
}
```

All three arrays are flat. Every consecutive group of three numbers
in `vertexCoordinates` and `faceNormalCoordinates` represents an
`(x, y, z)` triple. Every group of three in `faceVertexIndices`
references the vertices of a single triangle.


### `convertFaceVertexMeshToBufferGeometry(mesh)`

Returns a `BufferGeometry` with `position` (3-component float),
`normal` (3-component float), and a `Uint32` index buffer. The
bounding sphere is computed on the returned geometry.


### `convertBufferGeometryToFaceVertexMesh(geometry)`

Returns a `FaceVertexMesh`. The geometry must have `position`,
`normal`, and an index — otherwise the function throws.

> Note: round-tripping through `Float32Array` may quantize input
> coordinates that were authored at higher precision.


## Development

```sh
npm install
npm test     # tsx --test
npm run build
```
