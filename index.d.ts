type Vec3Like = { x?: string|number, y?: string|number, z?: string|number }|(string|number)[]|string; 

interface Vector3 {
    x: number, 
    y: number,
    z: number
}

export class Vec3 {
    constructor(x?: number, y?: number, z?: number);
    static get ZERO(): Vec3;
    static get POSITIVE(): Vec3;
    static get NEGATIVE(): Vec3;
    static isVec3(vec: Vec3Like): vec is Vec3;
    static isNaN(vec: Vec3Like): boolean;
    static from(object: Vec3Like, map: (vec: Vec3) => Vec3): Vec3;
    static add(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;
    static subtract(vec: Vec3Like, ...vector: Vec3Like[]): Vec3
    static multiply(vec: Vec3Like, n: number): Vec3;
    static pow(vec: Vec3Like, n: number): Vec3;
    static ceil(vec: Vec3Like): Vec3;
    static round(vec: Vec3Like): Vec3;
    static floor(vec: Vec3Like): Vec3;
    static fixed(vec: Vec3Like, n?: number): Vec3;
    static abs(vec: Vec3Like): Vec3;
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
    static circle(vec: Vec3Like, r: number, angle: number): Vec3;
    static sphere(vec: Vec3Like, r: number, longitude: number, latitude: number): Vec3;
    static distance(a: Vec3Like, b: Vec3Like): number;
    static facDirection(a: Vec3Like, b: Vec3Like): Vec3;
    static rotDirection(rot: Vec3Like): Vec3;
    static fill(n: number): Vec3;
    static line(a: Vec3Like, b: Vec3Like, s?: number): Vec3[];
    static size(a: Vec3Like, b: Vec3Like): number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    get East(): Vec3;
    get West(): Vec3
    get Up(): Vec3;
    get Down(): Vec3;
    get North(): Vec3;
    get South(): Vec3;
    add(...vector: Vec3Like[]): Vec3;
    subtract(...vector: Vec3Like[]): Vec3;
    multiply(n: number): Vec3
    pow(n: number): Vec3;
    ceil(): Vec3;
    floor(): Vec3;
    abs(): Vec3;
    fixed(n?: number): Vec3;
    offsetDirct(x: number, y: number, z: number, direction: Vector3): Vec3;
    offsetAll(n: number, match?: `${"x"|""}${"y"|""}${"z"|""}`): Vec3;
    offset(x: number, y: number, z: number): Vec3;
    offsetX(x: number): Vec3
    offsetY(y: number): Vec3
    offsetZ(z: number): Vec3
    setX(x: number): Vec3
    setY(y: number): Vec3
    setZ(z: number): Vec3;
    fill(vec: Vec3Like, match?: `${"x"|""}${"y"|""}${"z"|""}`): Vec3;
    equals(vec: Vec3Like, match?: `${"x"|""}${"y"|""}${"z"|""}`): boolean;
    clone(): Vec3;
    format(input: string): string;
    toString(): string;
    toArray(): [ x: number, y: number, z: number ];
    toJSON(): Vector3;
}

export class Vec3Volume {
    constructor(from: Vec3Like, to: Vec3Like);
    readonly from: Vec3;
    readonly to: Vec3;
    get min(): Vec3;
    get max(): Vec3;
    isInSide(vec: Vec3Like): boolean;
}