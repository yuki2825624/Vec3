export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = Number(x);
        this.y = Number(y);
        this.z = Number(z);
    }

    static get ZERO() {
        return Vec3.fill(0);
    }

    static get POSITIVE() {
        return Vec3.fill(1);
    }

    static get NEGATIVE() {
        return Vec3.fill(-1);
    }

    static isVec3(vec) {
        return vec instanceof Vec3;
    }

    static isVector3(vec) {
        return typeof vec === "object" && Object.keys(vec).length === 3 && !Vec3.isNaN(vec);
    }

    static isNaN(vec) {
        return Number.isNaN(Number(vec.x)) || Number.isNaN(Number(vec.y)) || Number.isNaN(Number(vec.z));
    }

    /** @returns {Vec3} */
    static from(object, map = (vec) => vec) {
        if (Vec3.isVec3(object)) return map(object);
        if (typeof object === "number") return map(Vec3.fill(object));
        if (typeof object === "string") object = object.split(/ +/);
        if (Array.isArray(object)) return map(new Vec3(object[0], object[1], object[2]));
        const { x = 0, y = 0, z = 0 } = object ?? {};
        return map(new Vec3(x, y, z));
    }

    static add(vec, ...vector) {
        return vector.reduce((result, vec) => Vec3.from(vec, (v) => new Vec3(result.x + v.x, result.y + v.y, result.z + v.z)), Vec3.from(vec));
    }

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

    static abs(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)));
    }

    static sign(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.sign(v.x), Math.sign(v.y), Math.sign(v.z)));
    }

    static align(vec) {
        return Vec3.from(vec).floor().add(0.5);
    }

    static fixed(vec, n = 0) {
        return Vec3.from(vec, (v) => new Vec3(Number(v.x.toFixed(n)), Number(v.y.toFixed(n)), Number(v.z.toFixed(n))));
    }

    static min(...vector) {
        return ((vector) => Vec3.from(["x", "y", "z"].map((axis) => Math.min(...vector.map((vec) => vec[axis])))))(vector.map((vec) => Vec3.from(vec)));
    }

    static max(...vector) {
        return ((vector) => Vec3.from(["x", "y", "z"].map((axis) => Math.max(...vector.map((vec) => vec[axis])))))(vector.map((vec) => Vec3.from(vec)));
    }

    static magnitude(vec) {
        return Math.sqrt(Vec3.dot(vec, vec));
    }

    static normalize(vec) {
        const l = Vec3.magnitude(vec);
        return Vec3.from(vec, (v) => new Vec3(v.x / l, v.y / l, v.z / l));
    }

    static cross(a, b) {
        return ((a, b) => new Vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x))(Vec3.from(a), Vec3.from(b));
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
        return Vec3.subtract(vec, Vec3.multiply(n, 2 * Vec3.dot(vec, n)));
    }

    static lerp(a, b, t) {
        return Vec3.multiply(a, 1 - t).add(Vec3.multiply(b, t));
    }

    static slerp(a, b, t) {
        const dot = Vec3.dot(a, b);
        const theta = Math.acos(dot) * t;
        return Vec3.multiply(a, Math.cos(theta)).add(Vec3.subtract(b, Vec3.multiply(a, dot)).multiply(Math.sin(theta)));
    }

    static circle(vec, r, angle) {
        return Vec3.from(vec).offset(r * Math.cos(angle), 0, r * Math.sin(angle));
    }
    
    static sphere(vec, r, longitude, latitude) {
        return Vec3.from(vec).offset(r * Math.sin(latitude) * Math.cos(longitude), r * Math.cos(latitude), r * Math.sin(latitude) * Math.sin(longitude));
    }

    static distance(a, b) {
        return Vec3.magnitude(Vec3.subtract(a, b));
    }

    static facDirection(a, b) {
        return Vec3.normalize(Vec3.subtract(b, a));
    }

    static rotDirection(rot) {
        return ((vec) => new Vec3(-Math.sin(vec.y) * Math.cos(vec.x), -Math.sin(vec.x), Math.cos(vec.y) * Math.cos(vec.x)))(Vec3.multiply(rot, Math.PI / 180));
    }

    static fill(n) {
        return new Vec3(n, n, n);
    }

    static line(a, b, s = 1) {
        return ((distance) => Array.from({ length: distance / s + 1 }, (_, i) => Vec3.lerp(a, b, i * s / distance)))(Vec3.distance(a, b));
    }

    static size(a, b) {
        return Vec3.subtract(Vec3.max(a, b), Math.min(a, b)).add(1);
    }

    static volume(a, b) {
        return ((size) => size.x * size.y * size.z)(Vec3.size(a, b));
    }

    get normalized() {
        return Vec3.normalize(this.clone());
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

    get South() {
        return this.offsetZ(1);
    }

    get North() {
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

    sign() {
        return Vec3.sign(this.clone());
    }

    align() {
        return Vec3.align(this.clone());
    }

    fixed(n = 0) {
        return Vec3.fixed(this.clone(), n);
    }

    offsetDirct(x, y, z, direction) {
        const zVec = Vec3.from(direction);
        const xVec = Vec3.normalize(new Vec3(zVec.z, 0, -zVec.x));
        const yVec = Vec3.normalize(Vec3.cross(zVec, xVec));
        return this.add(Vec3.multiply(xVec, x), Vec3.multiply(yVec, y), Vec3.multiply(zVec, z));
    }

    offsetAll(n, axis = "xyz") {
        if (axis.match(/[^xyz]/g)) throw new TypeError("axis contains other than x, y and z.");
        return Vec3.from([...axis].map((x) => this[x] + n));
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

    setAxis(axis) {
        if (axis.match(/[^xyz]/g)) throw new TypeError("axis contains other than x, y and z.");
        for (const x of ["x", "y", "z"]) if (!axis.includes(x)) this[x] = 0;
        return this.clone();
    }

    fill(n, axis = "xyz") {
        if (axis.match(/[^xyz]/g)) throw new TypeError("axis contains other than x, y and z.");
        for (const x of axis) this[x] = n;
        return this.clone();
    }

    equals(vec, axis = "xyz") {
        if (axis.match(/[^xyz]/g)) throw new TypeError("axis contains other than x, y and z.");
        const fromVec = this.clone(), toVec = Vec3.from(vec);
        return ![...axis].some((x) => fromVec[x] !== toVec[x]);
    }

    format(input) {
        return input
            .replace("$x", String(this.x))
            .replace("$y", String(this.y))
            .replace("$z", String(this.z));
    }

    clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    toString() {
        return `${this.x} ${this.y} ${this.z}`;
    }

    toArray() {
        return [this.x, this.y, this.z];
    }

    toJSON() {
        return { x: this.x, y: this.y, z: this.z };
    }
}

export class Vec3Volume {
    constructor(from, to) {
        this.from = Vec3.from(from);
        this.to = Vec3.from(to);
    }

    get min() {
        return Vec3.min(this.from, this.to);
    }

    get max() {
        return Vec3.max(this.from, this.to);
    }

    isInSide(vec) {
        return ((vec) => vec.x >= this.min.x && vec.x <= this.max.x && vec.y >= this.min.y && vec.y <= this.max.y && vec.z >= this.min.z && vec.z <= this.max.z)(vec);
    }

    clone() {
        return new Vec3Volume(this.from.clone(), this.to.clone());
    }

    toString() {
        return `${this.from.toString()}, ${this.to.toString()}`;
    }

    toArray() {
        return [ this.from, this.to ];
    }

    toJSON() {
        return { from: this.from.toJSON(), to: this.to.toJSON() };
    }
}