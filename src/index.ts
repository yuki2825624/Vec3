/**
 * @remarks
 * Vec3になりうる値
 */
export type Vec3Like =
    | { x?: string | number; y?: string | number; z?: string | number; }
    | (string | number)[]
    | string
    | number;

/**
 * @remarks
 * xyz軸のベクトル
 */
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

/**
 * @remarks
 * xy軸のベクトル
 */
export interface VectorXY {
    x: number;
    y: number;
}

/**
 * @remarks
 * ベクトルの操作
 */
export class Vec3 {
    /**
     * @param {string|number} x 
     * @param {string|number} y 
     * @param {string|number} z 
     */
    constructor(x: string | number = 0, y: string | number = 0, z: string | number = 0) {
        this.x = Number(x);
        this.y = Number(y);
        this.z = Number(z);
    }

    /**
     * @remarks
     * x成分
     */
    x: number;

    /**
     * @remarks
     * y成分
     */
    y: number;

    /**
     * @remarks
     * z成分
     */
    z: number;

    /**
     * @remarks
     * ゼロベクトル
     */
    static get ZERO() {
        return Vec3.from(0);
    }

    /**
     * @remarks
     * 成分がそれぞれ1のベクトル
     */
    static get POSITIVE() {
        return Vec3.from(1);
    }

    /**
     * @remarks
     * 成分がそれぞれ-1のベクトル
     */
    static get NEGATIVE() {
        return Vec3.from(-1);
    }

    /**
     * @remarks
     * 成分がそれぞれ正の無限大のベクトル
     */
    static get POSITIVE_INFINITY() {
        return Vec3.from(Number.POSITIVE_INFINITY);
    }

    /**
     * @remarks
     * 成分がそれぞれ負の無限大のベクトル
     */
    static get NEGATIVE_INFINITY() {
        return Vec3.from(Number.NEGATIVE_INFINITY);
    }

    /**
     * @param vec 値
     * @remarks
     * 値がVec3であるかを判断する
     */
    static isVec3(object: unknown): object is Vec3 {
        return object instanceof Vec3;
    }

    /**
     * @param object 値
     * @param map パースした後の値
     * @remarks
     * 値をVec3にパースする
     */
    static from<V extends Vec3>(object: Vec3Like, map: (vec: Vec3) => V = (vec => vec as V)): V {
        if (Vec3.isVec3(object)) return map(object);
        if (typeof object === "number") return map(new Vec3(object, object, object));
        if (typeof object === "string") return Vec3.from(object.trim().split(/ +/) as Vec3Like, map);
        if (Array.isArray(object)) return map(new Vec3(object[0], object[1], object[2]));
        const { x = 0, y = 0, z = 0 } = object ?? {};
        return map(new Vec3(x, y, z));
    }

    /**
     * @param vec 加算の基準となるベクトル
     * @param vector 加算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに加算した結果のベクトル
     */
    static add(vec: Vec3Like, ...vector: Vec3Like[]) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x + v.x, t.y + v.y, t.z + v.z), Vec3.from(vec));
    }

    /**
     * @param vec 減算の基準となるベクトル
     * @param vector 減算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに減算した結果のベクトル
     */
    static subtract(vec: Vec3Like, ...vector: Vec3Like[]): Vec3 {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x - v.x, t.y - v.y, t.z - v.z), Vec3.from(vec));
    }

    /**
     * @param vec 乗算の基準となるベクトル
     * @param vector 乗算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに乗算した結果のベクトル
     */
    static multiply(vec: Vec3Like, ...vector: Vec3Like[]) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x * v.x, t.y * v.y, t.z * v.z), Vec3.from(vec));
    }

    /**
     * @param vec 除算の基準となるベクトル
     * @param vector 除算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに除算した結果のベクトル
     */
    static divide(vec: Vec3Like, ...vector: Vec3Like[]) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x / v.x, t.y / v.y, t.z / v.z), Vec3.from(vec));
    }

    /**
     * @param vec 対象となるベクトル
     * @param n 指数
     * @remarks
     * ベクトルの各成分を n 乗したベクトル
     */
    static pow(vec: Vec3Like, n: number) {
        return Vec3.from(vec, (v) => new Vec3(v.x ** n, v.y ** n, v.z ** n));
    }

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を切り上げたベクトル
     */
    static ceil(vec: Vec3Like) {
        return Vec3.from(vec, (v) => new Vec3(Math.ceil(v.x), Math.ceil(v.y), Math.ceil(v.z)));
    }

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を四捨五入したベクトル
     */
    static round(vec: Vec3Like) {
        return Vec3.from(vec, (v) => new Vec3(Math.round(v.x), Math.round(v.y), Math.round(v.z)));
    }

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を切り捨てたベクトル
     */
    static floor(vec: Vec3Like) {
        return Vec3.from(vec, (v) => new Vec3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z)));
    }

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分の絶対値を取ったベクトル
     */
    static abs(vec: Vec3Like) {
        return Vec3.from(vec, (v) => new Vec3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)));
    }

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分の符号を取ったベクトル
     */
    static sign(vec: Vec3Like) {
        return Vec3.from(vec, (v) => new Vec3(Math.sign(v.x), Math.sign(v.y), Math.sign(v.z)));
    }

    /**
     * @param vec 対象となるベクトル
     * @param n 小数点以下の桁数
     * @remarks
     * ベクトルの各成分を少数第 n 桁で四捨五入したベクトル
     */
    static fixed(vec: Vec3Like, n: number) {
        return Vec3.divide(Vec3.round(Vec3.multiply(vec, 10 ** n)), 10 ** n);
    }

    /**
     * @param vector 比較対象となるベクトル群
     * @remarks
     * 複数ベクトルの各成分ごとの最小値からなるベクトル
     */
    static min(...vector: Vec3Like[]) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(Math.min(t.x, v.x), Math.min(t.y, v.y), Math.min(t.z, v.z)), Vec3.POSITIVE_INFINITY);
    }

    /**
     * @param vector 比較対象となるベクトル群
     * @remarks
     * 複数ベクトルの各成分ごとの最大値からなるベクトル
     */
    static max(...vector: Vec3Like[]) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(Math.max(t.x, v.x), Math.max(t.y, v.y), Math.max(t.z, v.z)), Vec3.NEGATIVE_INFINITY);
    }

    /**
     * @param vec 対象となるベクトル
     * @param min 最小値ベクトル
     * @param max 最大値ベクトル
     * @remarks
     * ベクトルの各成分を min と max の範囲に収めたベクトル
     */
    static clamp(vec: Vec3Like, min: Vec3Like, max: Vec3Like): Vec3 {
        return Vec3.from(vec, (v) => {
            const minV = Vec3.from(min);
            const maxV = Vec3.from(max);
            return Vec3.min(Vec3.max(v, minV), maxV);
        });
    }

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの大きさ（ユークリッドノルム）
     */
    static magnitude(vec: Vec3Like) {
        return Math.sqrt(Vec3.dot(vec, vec));
    }

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルを正規化した単位ベクトル
     */
    static normalize(vec: Vec3Like) {
        return Vec3.divide(vec, Vec3.magnitude(vec));
    }

    /**
     * @param a 外積の左項となるベクトル
     * @param b 外積の右項となるベクトル
     * @remarks
     * 2つのベクトルの外積
     */
    static cross(a: Vec3Like, b: Vec3Like) {
        return ((a, b) => new Vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x))(Vec3.from(a), Vec3.from(b));
    }

    /**
     * @param a 内積の左項となるベクトル
     * @param b 内積の右項となるベクトル
     * @remarks
     * 2つのベクトルの内積
     */
    static dot(a: Vec3Like, b: Vec3Like) {
        return ((a, b) => a.x * b.x + a.y * b.y + a.z * b.z)(Vec3.from(a), Vec3.from(b));
    }

    /**
     * @param a 比較対象となるベクトル
     * @param b 比較対象となるベクトル
     * @remarks
     * 2つのベクトル間の角度（ラジアン）
     */
    static angleBetween(a: Vec3Like, b: Vec3Like) {
        return Math.acos(Vec3.dot(a, b) / (Vec3.magnitude(a) * Vec3.magnitude(b)));
    }

    /**
     * @param a 射影されるベクトル
     * @param b 射影先の方向ベクトル
     * @remarks
     * ベクトル a をベクトル b の方向へ射影したベクトル (正射影)
     */
    static projection(a: Vec3Like, b: Vec3Like) {
        return Vec3.multiply(b, Vec3.dot(a, b) / (Vec3.dot(b, b) ** 2));
    }

    /**
     * @param a 対象となるベクトル
     * @param b 射影方向のベクトル
     * @remarks
     * ベクトル a から b 方向への射影成分を除いたベクトル (反射影)
     */
    static rejection(a: Vec3Like, b: Vec3Like) {
        return Vec3.subtract(a, Vec3.projection(a, b));
    }

    /**
     * @param vec 入射方向を表すベクトル
     * @param n 反射面の法線方向を表すベクトル
     * @remarks
     * 法線ベクトルで定義される面に対して、入射ベクトルを反射させた結果のベクトル
     */
    static reflect(vec: Vec3Like, n: Vec3Like) {
        return Vec3.subtract(vec, Vec3.multiply(n, 2 * Vec3.dot(vec, n)));
    }

    /**
     * @param a 補間の始点となるベクトル
     * @param b 補間の終点となるベクトル
     * @param t 補間係数
     * @remarks
     * 始点と終点の間を、補間係数 t（0~1）に基づいて線形補間したベクトル
     */
    static lerp(a: Vec3Like, b: Vec3Like, t: number) {
        return Vec3.multiply(a, 1 - t).add(Vec3.multiply(b, t));
    }

    /**
     * @param a 始点となるベクトル
     * @param b 終点となるベクトル
     * @param t 補間係数
     * @remarks
     * 始点と終点の間を、補間係数 t（0~1）に基づいて球面線形補間したベクトル
     */
    static slerp(a: Vec3Like, b: Vec3Like, t: number) {
        const dot = Vec3.dot(a, b);
        const theta = Math.acos(dot) * t;
        return Vec3.multiply(a, Math.cos(theta)).add(Vec3.subtract(b, Vec3.multiply(a, dot)).multiply(Math.sin(theta)));
    }

    /**
     * @param a 始点となるベクトル
     * @param b 終点となるベクトル
     * @remarks
     * 2点 a, b 間の距離
     */
    static distance(a: Vec3Like, b: Vec3Like) {
        return Vec3.magnitude(Vec3.subtract(a, b));
    }

    /**
     * @param origin 中心点となるベクトル
     * @param radius 半径
     * @param angle 角度
     * @remarks
     * origin を中心点とし、半径 radius、角度 angle に対応する円周上の点
     */
    static circle(origin: Vec3Like, radius: number, angle: number) {
        return Vec3.from(origin).offset(radius * Math.cos(angle), 0, radius * Math.sin(angle));
    }

    /**
     * @param origin 中心点となるベクトル
     * @param radius 半径
     * @param longitude 経度
     * @param latitude 緯度
     * @remarks
     * origin を中心点とし、半径 radius、経度 longitude、緯度 latitude に対応する球面上の点
     */
    static sphere(origin: Vec3Like, radius: number, longitude: number, latitude: number) {
        return Vec3.from(origin).offset(radius * Math.sin(latitude) * Math.cos(longitude), radius * Math.cos(latitude), radius * Math.sin(latitude) * Math.sin(longitude));
    }

    /**
     * @param vec 対象となるベクトル
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（X軸回転）
     */
    static rotateX(vec: Vec3Like, angle: number, origin: Vec3Like = Vec3.ZERO) {
        const v = Vec3.from(vec);
        const o = Vec3.from(origin);
        const d = Vec3.subtract(v, o);
        return new Vec3(v.x, d.y * Math.cos(angle) - d.z * Math.sin(angle) + o.y, d.y * Math.sin(angle) + d.z * Math.cos(angle) + o.z);
    }

    /**
     * @param vec 対象となるベクトル
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Y軸回転）
     */
    static rotateY(vec: Vec3Like, angle: number, origin: Vec3Like = Vec3.ZERO) {
        const v = Vec3.from(vec);
        const o = Vec3.from(origin);
        const d = Vec3.subtract(v, o);
        return new Vec3(d.x * Math.cos(angle) - d.z * Math.sin(angle) + o.x, v.y, d.x * Math.sin(angle) + d.z * Math.cos(angle) + o.z);
    }

    /**
     * @param vec 対象となるベクトル
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Z軸回転）
     */
    static rotateZ(vec: Vec3Like, angle: number, origin: Vec3Like = Vec3.ZERO) {
        const v = Vec3.from(vec);
        const o = Vec3.from(origin);
        const d = Vec3.subtract(v, o);
        return new Vec3(d.x * Math.cos(angle) - d.y * Math.sin(angle) + o.x, d.x * Math.sin(angle) + d.y * Math.cos(angle) + o.y, v.z);
    }

    /**
     * @param a 始点となるベクトル
     * @param b 終点となるベクトル
     * @remarks
     * 点 a から点 b への単位方向ベクトル
     */
    static facDirection(a: Vec3Like, b: Vec3Like) {
        return Vec3.normalize(Vec3.subtract(b, a));
    }

    /**
     * @param rot 回転角を表すベクトル
     * @remarks
     * 回転ベクトル（度数法）から単位方向ベクトルを取得する
     */
    static rotDirection(rot: VectorXY) {
        return ((vec) => new Vec3(-Math.sin(vec.y) * Math.cos(vec.x), -Math.sin(vec.x), Math.cos(vec.y) * Math.cos(vec.x)))(Vec3.multiply(rot, Math.PI / 180));
    }

    /**
     * @param a 比較対象となるベクトル
     * @param b 比較対象となるベクトル
     * @param axis 比較を行う軸指定
     * @remarks
     * 指定した軸成分について、2つのベクトルが等しいかを判定する
     */
    static equals(a: Vec3Like, b: Vec3Like, axis: `${"x" | ""}${"y" | ""}${"z" | ""}` = "xyz") {
        return ((a, b) => [...axis].every((x) => a[x] === b[x]))(Vec3.from(a), Vec3.from(b));
    }

    /**
     * @param a 範囲の一端となるベクトル
     * @param b 範囲の一端となるベクトル
     * @remarks
     * 2点 a, b で囲まれる直方体の各軸方向のサイズ（両端含む）
     */
    static size(a: Vec3Like, b: Vec3Like) {
        return Vec3.subtract(Vec3.max(a, b), Vec3.min(a, b)).add(1);
    }

    /**
     * @param a 範囲の一端となるベクトル
     * @param b 範囲の一端となるベクトル
     * @remarks
     * 2点 a, b で囲まれる直方体の体積
     */
    static volume(a: Vec3Like, b: Vec3Like) {
        const size = Vec3.size(a, b);
        return size.x * size.y * size.z;
    }

    /**
     * @remarks
     * ベクトルに加算する
     */
    add(...vector: Vec3Like[]) {
        return Vec3.add(this, ...vector);
    }

    /**
     * @remarks
     * ベクトルから減算する
     */
    subtract(...vector: Vec3Like[]) {
        return Vec3.subtract(this, ...vector);
    }

    /**
     * @remarks
     * ベクトルに乗算する
     */
    multiply(...vector: Vec3Like[]) {
        return Vec3.multiply(this, ...vector);
    }

    /**
     * @remarks
     * ベクトルに除算する
     */
    divide(...vector: Vec3Like[]) {
        return Vec3.divide(this, ...vector);
    }

    /**
     * @remarks
     * ベクトルの各成分をn倍する
     */
    pow(n: number) {
        return Vec3.pow(this, n);
    }

    /**
     * @remarks
     * ベクトルの各成分を切り上げる
     */
    ceil() {
        return Vec3.ceil(this);
    }

    /**
     * @remarks
     * ベクトルの各成分を四捨五入する
     */
    round() {
        return Vec3.round(this);
    }

    /**
     * @remarks
     * ベクトルの各成分を切り捨てる
     */
    floor() {
        return Vec3.floor(this);
    }

    /**
     * @remarks
     * ベクトルの各成分の絶対値を取る
     */
    abs() {
        return Vec3.abs(this);
    }

    /**
     * @remarks
     * ベクトルの符号を取る
     */
    sign() {
        return Vec3.sign(this);
    }

    /**
     * @remarks
     * 少数第n桁で四捨五入 
     */
    fixed(n: number) {
        return Vec3.fixed(this, n);
    }

    /**
     * @remarks
     * ベクトルを min ~ max の範囲に収める
     */
    clamp(min: Vec3Like, max: Vec3Like) {
        return Vec3.clamp(this, min, max);
    }

    /**
     * @remarks
     * ベクトルの大きさ
     */
    magnitude() {
        return Vec3.magnitude(this);
    }

    /**
     * @remarks
     * 正規化
     */
    normalize() {
        return Vec3.normalize(this);
    }

    /**
     * @param vec
     * @remarks
     * 外積
     */
    cross(vec: Vec3Like) {
        return Vec3.cross(this, vec);
    }

    /**
     * @param vec 
     * @remarks
     * 内積
     */
    dot(vec: Vec3Like) {
        return Vec3.dot(this, vec);
    }

    /**
     * @remarks
     * ベクトル間の角度
     */
    angleBetween(vec: Vec3Like) {
        return Vec3.angleBetween(this, vec);
    }

    /**
     * @remarks
     * 正射影
     */
    projection(vec: Vec3Like) {
        return Vec3.projection(this, vec);
    }

    /**
     * @remarks
     * 反射影
     */
    rejection(vec: Vec3Like) {
        return Vec3.rejection(this, vec);
    }

    reflect(vec: Vec3Like) {
        return Vec3.reflect(this, vec);
    } 

    /**
     * @remarks
     * ベクトルのx座標を絶対座標で変更する
     */
    setX(x: number) {
        return new Vec3(x, this.y, this.z);
    }

    /**
     * @remarks
     * ベクトルのy座標を絶対座標で変更する
     */
    setY(y: number) {
        return new Vec3(this.x, y, this.z);
    }

    /**
     * @remarks
     * ベクトルのz座標を絶対座標で変更する
     */
    setZ(z: number) {
        return new Vec3(this.x, this.y, z);
    }

    /**
     * @remarks
     * ベクトルの各成分を相対座標で変更する
     */
    offset(x: number, y: number, z: number) {
        return Vec3.add(this, new Vec3(x, y, z));
    }

    /**
     * @remarks
     * ベクトルのx成分を相対座標で変更する
     */
    offsetX(x: number) {
        return this.offset(x, 0, 0);
    }

    /**
     * @remarks
     * ベクトルのy成分を相対座標で変更する
     */
    offsetY(y: number) {
        return this.offset(0, y, 0);
    }

    /**
     * @remarks
     * ベクトルのz成分を相対座標で変更する
     */
    offsetZ(z: number) {
        return this.offset(0, 0, z);
    }

    /**
     * @remarks
     * ベクトルの各成分をローカル座標で変更する
     */
    offsetLocal(x: number, y: number, z: number, dirct: Vec3Like) {
        const zVec = Vec3.from(dirct);
        const xVec = Vec3.normalize(new Vec3(zVec.z, 0, -zVec.x));
        const yVec = Vec3.cross(zVec, xVec);
        return Vec3.add(this, Vec3.multiply(xVec, x), Vec3.multiply(yVec, y), Vec3.multiply(zVec, z));
    }

    /**
     * @remarks
     * ベクトルのx成分をローカル座標で変更する
     */
    offsetLocalX(x: number, dirct: Vec3Like) {
        return this.offsetLocal(x, 0, 0, dirct);
    }

    /**
     * @remarks
     * ベクトルのy成分をローカル座標で変更する
     */
    offsetLocalY(y: number, dirct: Vec3Like) {
        return this.offsetLocal(0, y, 0, dirct);
    }

    /**
     * @remarks
     * ベクトルのz成分をローカル座標で変更する
     */
    offsetLocalZ(z: number, dirct: Vec3Like) {
        return this.offsetLocal(0, 0, z, dirct);
    }

    /**
     * @remarks
     * ベクトルを origin を中心に angle だけ回転させる (X軸回転)
     */
    rotateX(angle: number, origin?: Vec3Like) {
        return Vec3.rotateX(this, angle, origin);
    }

    /**
     * @remarks
     * ベクトルを origin を中心に angle だけ回転させる (Y軸回転)
     */
    rotateY(angle: number, origin?: Vec3Like) {
        return Vec3.rotateY(this, angle, origin);
    }

    /**
     * @remarks
     * ベクトルを origin を中心に angle だけ回転させる (Z軸回転)
     */
    rotateZ(angle: number, origin?: Vec3Like) {
        return Vec3.rotateZ(this, angle, origin);
    }

    /**
     * @remarks
     * ベクトルの各成分が等しいかを判断する
     */
    equals(vec: Vec3Like, axis?: `${"x" | ""}${"y" | ""}${"z" | ""}`) {
        return Vec3.equals(this, vec, axis);
    }

    /**
     * @remarks
     * 文字列形式に変換する
     */
    toString() {
        return `${this.x} ${this.y} ${this.z}`;
    }

    /**
     * @remarks
     * 配列形式に変換する
     */
    toArray(): [x: number, y: number, z: number] {
        return [this.x, this.y, this.z];
    }

    /**
     * @remarks
     * JSON形式に変換する
     */
    toJSON(): Vector3 {
        return { x: this.x, y: this.y, z: this.z };
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
