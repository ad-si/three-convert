declare module 'three' {
  namespace three {
    class Vector3 {
      x: number
      y: number
      z: number
      constructor(x?: number, y?: number, z?: number)
    }

    class Face3 {
      a: number
      b: number
      c: number
      normal: Vector3
      constructor(a: number, b: number, c: number, normal?: Vector3)
    }

    class Geometry {
      vertices: Vector3[]
      faces: Face3[]
      constructor()
    }

    class BufferAttribute {
      constructor(array: ArrayLike<number>, itemSize: number)
    }

    class BufferGeometry {
      constructor()
      addAttribute(name: string, attribute: BufferAttribute): void
      computeBoundingSphere(): void
    }
  }
  export = three
}
