declare module 'three' {
  export class Vector3 {
    x: number
    y: number
    z: number
    constructor(x?: number, y?: number, z?: number)
  }

  export class Face3 {
    a: number
    b: number
    c: number
    normal: Vector3
    constructor(a: number, b: number, c: number, normal?: Vector3)
  }

  export class Geometry {
    vertices: Vector3[]
    faces: Face3[]
    constructor()
  }

  export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number)
  }

  export class BufferGeometry {
    constructor()
    addAttribute(name: string, attribute: BufferAttribute): void
    computeBoundingSphere(): void
  }
}
