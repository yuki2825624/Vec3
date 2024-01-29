/** @typedef {{ x: number, y: number, z: number }} Vector3 */

export class Vec3 {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x = 0, y = 0, z = 0) {
        this.x = Number(x);
        this.y = Number(y);
        this.z = Number(z);
    }

    static isVec3(vec) {
        return vec instanceof Vec3;
    }

    static isNaN(vec) {
        return Number.isNaN(Number(vec.x)) || Number.isNaN(Number(vec.y)) || Number.isNaN(Number(vec.z));
    }

    /** @returns {Vec3} */
    static from(object, callback = (vec) => vec) {
        if (Vec3.isVec3(object)) return callback(object);
        if (typeof object === "string") object = object.split(/ +/);
        if (Array.isArray(object)) return callback(new Vec3(object[0], object[1], object[2]));
        const { x = 0, y = 0, z = 0 } = object ?? {};
        return callback(new Vec3(x, y, z));
    }

    /** @returns {Vec3} */
    static add(vec, ...vector) {
        return vector.reduce((result, vec) => Vec3.from(vec, (v) => new Vec3(result.x + v.x, result.y + v.y, result.z + v.z)), Vec3.from(vec));
    }

    /** @returns {Vec3} */
    static subtract(vec, ...vector) {
        return vector.reduce((result, vec) => Vec3.from(vec, (v) => new Vec3(result.x - v.x, result.y - v.y, result.z - v.z)), Vec3.from(vec));
    }

    static multiply(vec, n) {
        return Vec3.from(vec, (v) => new Vec3(v.x * n, v.y * n, v.z * n));
    }
    
    static pow(vec, n) {
        return Vec3.from(vec, (v) => new Vec3(v.x ** n, v.y ** n, v.z ** n));
    }

    static ceil(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.ceil(v.x), Math.ceil(v.y), Math.ceil(v.z)));
    }

    static round(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.round(v.x), Math.round(v.y), Math.round(v.z)));
    }

    static floor(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z)));
    }

    static fixed(vec, n = 0) {
        return Vec3.from(vec, (v) => new Vec3(Number(v.y.toFixed(n)), Number(v.y.toFixed(n)), Number(v.y.toFixed(n))));
    }
    
    static abs(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)));
    }

    static min(...vector) {
        return ((vector) => Vec3.from([ "x", "y", "z" ].map((axis) => Math.min(...vector.map((vec) => vec[axis])))))(vector.map((vec) => Vec3.from(vec)));
    }

    static max(...vector) {
        return ((vector) => Vec3.from([ "x", "y", "z" ].map((axis) => Math.max(...vector.map((vec) => vec[axis])))))(vector.map((vec) => Vec3.from(vec)));
    }

    static magnitude(vec) {
        return Math.sqrt(Vec3.dot(vec, vec));
    }

    static normalize(vec) {
        const l = Vec3.magnitude(vec);
        return Vec3.from(vec, (v) => new Vec3(v.x / l, v.y / l, v.z / l));
    }

    static cross(a, b) {
        return ((a, b) => new Vec3(a.y * b.z - a.z * b.y, a.x * b.z - a.z * b.x, a.x * b.y - a.y * b.x))(Vec3.from(a), Vec3.from(b));
    }

    static dot(a, b) {
        return ((a, b) => a.x * b.x + a.y * b.y + a.z * b.z)(Vec3.from(a), Vec3.from(b));
    }

    static angleBetween(a, b) {
        return Math.acos(Vec3.dot(a, b) / (Vec3.magnitude(a) * Vec3.magnitude(b)));
    }

    static projection(a, b) {
        return Vec3.multiply(b, Vec3.dot(a, b) / (Vec3.dot(b, b) ** 2));
    }

    static rejection(a, b) {
        return Vec3.subtract(a, Vec3.projection(a, b));
    }

    static reflect(vec, n) {
        return Vec3.subtract(v, Vec3.multiply(n, 2 * Vec3.dot(v, n)));
    }

    static lerp(a, b, t) {
        return Vec3.multiply(a, 1 - t).add(Vec3.multiply(b, t));
    }

    static distance(a, b) {
        return Vec3.magnitude(Vec3.subtract(a, b));
    }

    static direction(a, b) {
        return Vec3.normalize(Vec3.subtract(b, a));
    }

    static fill(n) {
        return new Vec3(n, n, n);
    }

    /** @returns {Vec3[]} */
    static line(a, b, s = 1) {
        return ((distance) => Array.from({ length: distance / s + 1 }, (_, i) => Vec3.lerp(a, b, i * s / distance)))(Vec3.distance(a, b));
    }

    static size(a, b) {
        return ((a, b) => (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1) * (Math.abs(a.z - b.z) + 1))(Vec3.from(a), Vec3.from(b));
    }

    get East() {
        return this.offsetX(1);
    }
    
    get West() {
        return this.offsetX(-1);
    }

    get Up() {
        return this.offsetY(1);
    }

    get Down() {
        return this.offsetY(-1);
    }
    
    get North() {
        return this.offsetZ(1);
    }
    
    get South() {
        return this.offsetZ(-1);
    }

    add(...vector) {
        return Vec3.add(this.clone(), ...vector);
    }

    subtract(...vector) {
        return Vec3.subtract(this.clone(), ...vector);
    }

    multiply(n) {
        return Vec3.multiply(this.clone(), n);
    }

    pow(n) {
        return Vec3.pow(this.clone(), n);
    }

    ceil() {
        return Vec3.ceil(this.clone());
    }

    round() {
        return Vec3.round(this.clone());
    }

    floor() {
        return Vec3.floor(this.clone());
    }

    abs() {
        return Vec3.abs(this.clone());
    }

    fixed(n = 0) {
        return Vec3.fixed(this.clone(), n); 
    }

    offsetDirct(x, y, z, direction) {
        const zVec = direction;
        const xVec = Vec3.normalize(new Vec3(zVec.z, 0, zVec.x));
        const yVec = Vec3.normalize(Vec3.cross(xVec, zVec));
        return this.add(Vec3.multiply(xVec, x), Vec3.multiply(yVec, y), Vec3.multiply(zVec, z));
    }

    offsetAll(n) {
        return this.clone().offset(n, n, n);
    }

    offset(x, y, z) {
        return Vec3.add(this.clone(), new Vec3(x, y, z));
    }

    offsetX(x) {
        return this.offset(x, 0, 0);
    }

    offsetY(y) {
        return this.offset(0, y, 0);
    }

    offsetZ(z) {
        return this.offset(0, 0, z);
    }
    
    setX(x) {
        return new Vec3(x, this.y, this.z);
    }

    setY(y) {
        return new Vec3(this.x, y, this.z);
    }

    setZ(z) {
        return new Vec3(this.x, this.y, z);
    }

    /**
     * @param {any} vec 
     * @param {`${"x"|""}${"y"|""}${"z"|""}`} match
     */
    equals(vec, match = "xyz") {
        if (match.match(/[^xyz]/g)) throw new TypeError("match contains other than x, y and z.");
        const fromVec = this.clone(), toVec = Vec3.from(vec);
        return ![ ...match ].some((axis) => fromVec[axis] !== toVec[axis]);
    }

    clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    /**
     * @param {string} input
     * @example
     * ```js
     * const result = new Vec3(1, 2, 3).format("X: $x Y: $y Z: $z");  
     * console.log(result); // X: 1 Y: 2 Z: 3
     * ```
     */
    format(input) {
        return input
            .replace("x", String(this.x))
            .replace("y", String(this.y))
            .replace("z", String(this.z));
    }

    toString() {
        return `${this.x} ${this.y} ${this.z}`;
    }

    toArray() {
        return [ this.x, this.y, this.z ];
    }

    toJSON() {
        return { x: this.x, y: this.y, z: this.z };
    }
}

// module.exports = { Vec3 };