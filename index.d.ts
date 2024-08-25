type Vec3Like = { x?: string | number, y?: string | number, z?: string | number } | (string | number)[] | string | number;

interface Vector3 {
    x: number,
    y: number,
    z: number
}

interface Vector2 {
    x: number;
    y: number;
}

export class Vec3 {
    constructor(x?: any, y?: any, z?: any);
    static get ZERO(): Vec3;
    static get POSITIVE(): Vec3;
    static get NEGATIVE(): Vec3;
    static get POSITIVE_INFINITY(): Vec3;
    static get NEGATIVE_INFINITY(): Vec3;
    static isVec3(vec: Vec3Like): vec is Vec3;
    static from<V extends Vec3>(object: Vec3Like, map?: (vec: Vec3) => V): V;
    static add(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;
    static subtract(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;
    static multiply(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;
    static divide(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;
    static pow(vec: Vec3Like, n: number): Vec3;
    static ceil(vec: Vec3Like): Vec3;
    static round(vec: Vec3Like): Vec3;
    static floor(vec: Vec3Like): Vec3;
    static abs(vec: Vec3Like): Vec3;
    static sign(vec: Vec3Like): Vec3;
    static fixed(vec: Vec3Like, n: number): Vec3;
    static min(...vector: Vec3Like[]): Vec3;
    static max(...vector: Vec3Like[]): Vec3;
    static magnitude(vec: Vec3Like): number;
    static normalize(vec: Vec3Like): Vec3;
    static cross(a: Vec3Like, b: Vec3Like): Vec3;
    static dot(a: Vec3Like, b: Vec3Like): number;
    static angleBetween(a: Vec3Like, b: Vec3Like): number;
    static projection(a: Vec3Like, b: Vec3Like): Vec3;
    static rejection(a: Vec3Like, b: Vec3Like): Vec3;
    static reflect(vec: Vec3Like, n: number): Vec3;
    static lerp(a: Vec3Like, b: Vec3Like, t: number): Vec3;
    static slerp(a: Vec3Like, b: Vec3Like, t: number): Vec3;
    static distance(a: Vec3Like, b: Vec3Like): number;
    static circle(vec: Vec3Like, radius: number, angle: number): Vec3;
    static sphere(vec: Vec3Like, radius: number, longitude: number, latitude: number): Vec3;
    static rotateX(vec: Vec3Like, angle: number, origin?: Vec3Like): Vec3;
    static rotateY(vec: Vec3Like, angle: number, origin?: Vec3Like): Vec3;
    static rotateZ(vec: Vec3Like, angle: number, origin?: Vec3Like): Vec3;
    static facDirection(a: Vec3Like, b: Vec3Like): Vec3;
    static rotDirection(rot: Vector2): Vec3;
    static equals(a: Vec3Like, b: Vec3Like, axis?: `${"x" | ""}${"y" | ""}${"z" | ""}`): boolean;
    static size(a: Vec3Like, b: Vec3Like): Vec3;
    static volume(a: Vec3Like, b: Vec3Like): number;
    x: number;
    y: number;
    z: number;
    add(...vector: Vec3Like[]): Vec3;
    subtract(...vector: Vec3Like[]): Vec3;
    multiply(...vector: Vec3Like[]): Vec3;
    divide(...vector: Vec3Like[]): Vec3;
    pow(n: number): Vec3;
    ceil(): Vec3;
    floor(): Vec3;
    abs(): Vec3;
    sign(): Vec3;
    fixed(n: number): Vec3;
    normalize(): Vec3;
    setX(x: number): Vec3;
    setY(y: number): Vec3;
    setZ(z: number): Vec3;
    offset(x: number, y: number, z: number): Vec3;
    offsetX(x: number): Vec3;
    offsetY(y: number): Vec3;
    offsetZ(z: number): Vec3;
    offsetLocal(x: number, y: number, z: number, dirct: Vec3Like): Vec3;
    offsetLocalX(x: number, dirct: Vec3Like): Vec3;
    offsetLocalY(y: number, dirct: Vec3Like): Vec3;
    offsetLocalZ(z: number, dirct: Vec3Like): Vec3;
    rotateX(angle: number, origin?: Vec3Like): Vec3;
    rotateY(angle: number, origin?: Vec3Like): Vec3;
    rotateZ(angle: number, origin?: Vec3Like): Vec3;
    equals(vec: Vec3Like, axis?: `${"x" | ""}${"y" | ""}${"z" | ""}`): boolean;
    toString(): string;
    toArray(): [x: number, y: number, z: number];
    toJSON(): Vector3;
}