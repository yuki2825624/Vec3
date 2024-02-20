interface Vector3 {
    x: number, 
    y: number,
    z: number
}

export class Vec3 {
    constructor(x?: number, y?: number, z?: number);
    static isVec3(vec: any): vec is Vec3;
    static isNaN(vec: any): boolean;
    static from(object: any): Vec3;
    static add(vec: any, ...vector: any[]): Vec3;
    static subtract(vec: any, ...vector: any[]): Vec3
    static multiply(vec: any, n: number): Vec3;
    static pow(vec: any, n: number): Vec3;
    static ceil(vec: any): Vec3;
    static round(vec: any): Vec3;
    static floor(vec: any): Vec3;
    static fixed(vec: any, n?: number): Vec3;
    static abs(vec: any): Vec3;
    static min(...vector: any[]): Vec3;
    static max(...vector: any[]): Vec3;
    static magnitude(vec: any): number;
    static normalize(vec: any): Vec3;
    static cross(a: any, b: any): Vec3;
    static dot(a: any, b: any): number;
    static angleBetween(a: any, b: any): number;
    static projection(a: any, b: any): Vec3;
    static rejection(a: any, b: any): Vec3;
    static reflect(vec: any, n: number): Vec3;
    static lerp(a: any, b: any, t: number): Vec3;
    static slerp(a: any, b: any, t: number): Vec3;
    static circle(vec: any, r: number, angle: number): Vec3;
    static distance(a: any, b: any): number;
    static direction(a: any, b: any): Vec3;
    static fill(n: number): Vec3;
    static line(a: any, b: any, s?: number): Vec3[];
    static size(a: any, b: any): number;
    get East(): Vec3;
    get West(): Vec3
    get Up(): Vec3;
    get Down(): Vec3;
    get North(): Vec3;
    get South(): Vec3;
    add(...vector: any[]): Vec3;
    subtract(...vector: any[]): Vec3;
    multiply(n: number): Vec3
    pow(n: number): Vec3;
    ceil(): Vec3;
    floor(): Vec3;
    abs(): Vec3;
    fixed(n?: number): Vec3;
    offsetDirct(x: number, y: number, z: number, direction: Vector3): Vec3;
    offsetAll(n: number): Vec3;
    offset(x: number, y: number, z: number): Vec3;
    offsetX(x: number): Vec3
    offsetY(y: number): Vec3
    offsetZ(z: number): Vec3
    setX(x: number): Vec3
    setY(y: number): Vec3
    setZ(z: number): Vec3;
    equals(vec: any, match?: `${"x"|""}${"y"|""}${"z"|""}`): boolean;
    clone(): Vec3;
    format(input: string): string;
    toString(): string;
    toArray(): [ x: number, y: number, z: number ];
    toJSON(): Vector3;
}