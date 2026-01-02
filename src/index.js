/**
 * @typedef {Object} Vector3
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef {Object} VectorXY
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object | Array.<string|number> | string | number} Vec3Like
 */

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
    constructor(x = 0, y = 0, z = 0) {
        /**
         * @remarks
         * x成分
         */
        this.x = Number(x);
        /**
         * @remarks
         * y成分
         */
        this.y = Number(y);
        /**
         * @remarks
         * z成分
         */
        this.z = Number(z);
    }

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
     * @param {unknown} object 値
     * @remarks
     * 値がVec3であるかを判断する
     */
    static isVec3(object) {
        return object instanceof Vec3;
    }

    /**
     * @template {Vec3} V
     * @param {Vec3Like} object 値
     * @param {(vec: Vec3) => V} map パースした後の値
     * @returns {V}
     * @remarks
     * 値をVec3にパースする
     */
    static from(object, map = (vec => vec)) {
        if (Vec3.isVec3(object)) return map(object);
        if (typeof object === "number") return map(new Vec3(object, object, object));
        if (typeof object === "string") return Vec3.from(object.trim().split(/ +/) , map);
        if (Array.isArray(object)) return map(new Vec3(object[0], object[1], object[2]));
        const { x = 0, y = 0, z = 0 } = object ?? {};
        return map(new Vec3(x, y, z));
    }

    /**
     * @param {Vec3Like} vec 加算の基準となるベクトル
     * @param {...Vec3Like} vector 加算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに加算した結果のベクトル
     */
    static add(vec, ...vector) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x + v.x, t.y + v.y, t.z + v.z), Vec3.from(vec));
    }

    /**
     * @param {Vec3Like} vec 減算の基準となるベクトル
     * @param {...Vec3Like} vector 減算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに減算した結果のベクトル
     */
    static subtract(vec, ...vector) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x - v.x, t.y - v.y, t.z - v.z), Vec3.from(vec));
    }

    /**
     * @param {Vec3Like} vec 乗算の基準となるベクトル
     * @param {...Vec3Like} vector 乗算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに乗算した結果のベクトル
     */
    static multiply(vec, ...vector) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x * v.x, t.y * v.y, t.z * v.z), Vec3.from(vec));
    }

    /**
     * @param {Vec3Like} vec 除算の基準となるベクトル
     * @param {...Vec3Like} vector 除算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに除算した結果のベクトル
     */
    static divide(vec, ...vector) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(t.x / v.x, t.y / v.y, t.z / v.z), Vec3.from(vec));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @param {number} n 指数
     * @remarks
     * ベクトルの各成分を n 乗したベクトル
     */
    static pow(vec, n) {
        return Vec3.from(vec, (v) => new Vec3(v.x ** n, v.y ** n, v.z ** n));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を切り上げたベクトル
     */
    static ceil(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.ceil(v.x), Math.ceil(v.y), Math.ceil(v.z)));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を四捨五入したベクトル
     */
    static round(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.round(v.x), Math.round(v.y), Math.round(v.z)));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を切り捨てたベクトル
     */
    static floor(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z)));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分の絶対値を取ったベクトル
     */
    static abs(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分の符号を取ったベクトル
     */
    static sign(vec) {
        return Vec3.from(vec, (v) => new Vec3(Math.sign(v.x), Math.sign(v.y), Math.sign(v.z)));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @param {number} n 小数点以下の桁数
     * @remarks
     * ベクトルの各成分を少数第 n 桁で四捨五入したベクトル
     */
    static fixed(vec, n) {
        return Vec3.divide(Vec3.round(Vec3.multiply(vec, 10 ** n)), 10 ** n);
    }

    /**
     * @param {...Vec3Like} vector 比較対象となるベクトル群
     * @remarks
     * 複数ベクトルの各成分ごとの最小値からなるベクトル
     */
    static min(...vector) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(Math.min(t.x, v.x), Math.min(t.y, v.y), Math.min(t.z, v.z)), Vec3.POSITIVE_INFINITY);
    }

    /**
     * @param {...Vec3Like} vector 比較対象となるベクトル群
     * @remarks
     * 複数ベクトルの各成分ごとの最大値からなるベクトル
     */
    static max(...vector) {
        return vector
            .map((v) => Vec3.from(v))
            .reduce((t, v) => new Vec3(Math.max(t.x, v.x), Math.max(t.y, v.y), Math.max(t.z, v.z)), Vec3.NEGATIVE_INFINITY);
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @param {Vec3Like} min 最小値ベクトル
     * @param {Vec3Like} max 最大値ベクトル
     * @remarks
     * ベクトルの各成分を min と max の範囲に収めたベクトル
     */
    static clamp(vec, min, max) {
        return Vec3.from(vec, (v) => {
            const minV = Vec3.from(min);
            const maxV = Vec3.from(max);
            return Vec3.min(Vec3.max(v, minV), maxV);
        });
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @remarks
     * ベクトルの大きさ（ユークリッドノルム）
     */
    static magnitude(vec) {
        return Math.sqrt(Vec3.dot(vec, vec));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @remarks
     * ベクトルを正規化した単位ベクトル
     */
    static normalize(vec) {
        return Vec3.divide(vec, Vec3.magnitude(vec));
    }

    /**
     * @param {Vec3Like} a 外積の左項となるベクトル
     * @param {Vec3Like} b 外積の右項となるベクトル
     * @remarks
     * 2つのベクトルの外積
     */
    static cross(a, b) {
        return ((a, b) => new Vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x))(Vec3.from(a), Vec3.from(b));
    }

    /**
     * @param {Vec3Like} a 内積の左項となるベクトル
     * @param {Vec3Like} b 内積の右項となるベクトル
     * @remarks
     * 2つのベクトルの内積
     */
    static dot(a, b) {
        return ((a, b) => a.x * b.x + a.y * b.y + a.z * b.z)(Vec3.from(a), Vec3.from(b));
    }

    /**
     * @param {Vec3Like} a 比較対象となるベクトル
     * @param {Vec3Like} b 比較対象となるベクトル
     * @remarks
     * 2つのベクトル間の角度（ラジアン）
     */
    static angleBetween(a, b) {
        return Math.acos(Vec3.dot(a, b) / (Vec3.magnitude(a) * Vec3.magnitude(b)));
    }

    /**
     * @param {Vec3Like} a 射影されるベクトル
     * @param {Vec3Like} b 射影先の方向ベクトル
     * @remarks
     * ベクトル a をベクトル b の方向へ射影したベクトル (正射影)
     */
    static projection(a, b) {
        return Vec3.multiply(b, Vec3.dot(a, b) / (Vec3.dot(b, b) ** 2));
    }

    /**
     * @param {Vec3Like} a 対象となるベクトル
     * @param {Vec3Like} b 射影方向のベクトル
     * @remarks
     * ベクトル a から b 方向への射影成分を除いたベクトル (反射影)
     */
    static rejection(a, b) {
        return Vec3.subtract(a, Vec3.projection(a, b));
    }

    /**
     * @param {Vec3Like} vec 入射方向を表すベクトル
     * @param {Vec3Like} n 反射面の法線方向を表すベクトル
     * @remarks
     * 法線ベクトルで定義される面に対して、入射ベクトルを反射させた結果のベクトル
     */
    static reflect(vec, n) {
        return Vec3.subtract(vec, Vec3.multiply(n, 2 * Vec3.dot(vec, n)));
    }

    /**
     * @param {Vec3Like} a 補間の始点となるベクトル
     * @param {Vec3Like} b 補間の終点となるベクトル
     * @param {number} t 補間係数
     * @remarks
     * 始点と終点の間を、補間係数 t（0~1）に基づいて線形補間したベクトル
     */
    static lerp(a, b, t) {
        return Vec3.multiply(a, 1 - t).add(Vec3.multiply(b, t));
    }

    /**
     * @param {Vec3Like} a 始点となるベクトル
     * @param {Vec3Like} b 終点となるベクトル
     * @param {number} t 補間係数
     * @remarks
     * 始点と終点の間を、補間係数 t（0~1）に基づいて球面線形補間したベクトル
     */
    static slerp(a, b, t) {
        const dot = Vec3.dot(a, b);
        const theta = Math.acos(dot) * t;
        return Vec3.multiply(a, Math.cos(theta)).add(Vec3.subtract(b, Vec3.multiply(a, dot)).multiply(Math.sin(theta)));
    }

    /**
     * @param {Vec3Like} a 始点となるベクトル
     * @param {Vec3Like} b 終点となるベクトル
     * @remarks
     * 2点 a, b 間の距離
     */
    static distance(a, b) {
        return Vec3.magnitude(Vec3.subtract(a, b));
    }

    /**
     * @param {Vec3Like} origin 中心点となるベクトル
     * @param {number} radius 半径
     * @param {number} angle 角度
     * @remarks
     * origin を中心点とし、半径 radius、角度 angle に対応する円周上の点
     */
    static circle(origin, radius, angle) {
        return Vec3.from(origin).offset(radius * Math.cos(angle), 0, radius * Math.sin(angle));
    }

    /**
     * @param {Vec3Like} origin 中心点となるベクトル
     * @param {number} radius 半径
     * @param {number} longitude 経度
     * @param {number} latitude 緯度
     * @remarks
     * origin を中心点とし、半径 radius、経度 longitude、緯度 latitude に対応する球面上の点
     */
    static sphere(origin, radius, longitude, latitude) {
        return Vec3.from(origin).offset(radius * Math.sin(latitude) * Math.cos(longitude), radius * Math.cos(latitude), radius * Math.sin(latitude) * Math.sin(longitude));
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @param {number} angle 回転角
     * @param {Vec3Like} origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（X軸回転）
     */
    static rotateX(vec, angle, origin = Vec3.ZERO) {
        const v = Vec3.from(vec);
        const o = Vec3.from(origin);
        const d = Vec3.subtract(v, o);
        return new Vec3(v.x, d.y * Math.cos(angle) - d.z * Math.sin(angle) + o.y, d.y * Math.sin(angle) + d.z * Math.cos(angle) + o.z);
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @param {number} angle 回転角
     * @param {Vec3Like} origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Y軸回転）
     */
    static rotateY(vec, angle, origin = Vec3.ZERO) {
        const v = Vec3.from(vec);
        const o = Vec3.from(origin);
        const d = Vec3.subtract(v, o);
        return new Vec3(d.x * Math.cos(angle) - d.z * Math.sin(angle) + o.x, v.y, d.x * Math.sin(angle) + d.z * Math.cos(angle) + o.z);
    }

    /**
     * @param {Vec3Like} vec 対象となるベクトル
     * @param {number} angle 回転角
     * @param {Vec3Like} origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Z軸回転）
     */
    static rotateZ(vec, angle, origin = Vec3.ZERO) {
        const v = Vec3.from(vec);
        const o = Vec3.from(origin);
        const d = Vec3.subtract(v, o);
        return new Vec3(d.x * Math.cos(angle) - d.y * Math.sin(angle) + o.x, d.x * Math.sin(angle) + d.y * Math.cos(angle) + o.y, v.z);
    }

    /**
     * @param {Vec3Like} a 始点となるベクトル
     * @param {Vec3Like} b 終点となるベクトル
     * @remarks
     * 点 a から点 b への単位方向ベクトル
     */
    static facDirection(a, b) {
        return Vec3.normalize(Vec3.subtract(b, a));
    }

    /**
     * @param {VectorXY} rot 回転角を表すベクトル
     * @remarks
     * 回転ベクトル（度数法）から単位方向ベクトルを取得する
     */
    static rotDirection(rot) {
        return ((vec) => new Vec3(-Math.sin(vec.y) * Math.cos(vec.x), -Math.sin(vec.x), Math.cos(vec.y) * Math.cos(vec.x)))(Vec3.multiply(rot, Math.PI / 180));
    }

    /**
     * @param {Vec3Like} a 比較対象となるベクトル
     * @param {Vec3Like} b 比較対象となるベクトル
     * @param {string} axis 比較を行う軸指定
     * @remarks
     * 指定した軸成分について、2つのベクトルが等しいかを判定する
     */
    static equals(a, b, axis = "xyz") {
        return ((a, b) => [...axis].every((x) => a[x] === b[x]))(Vec3.from(a), Vec3.from(b));
    }

    /**
     * @param {Vec3Like} a 範囲の一端となるベクトル
     * @param {Vec3Like} b 範囲の一端となるベクトル
     * @remarks
     * 2点 a, b で囲まれる直方体の各軸方向のサイズ（両端含む）
     */
    static size(a, b) {
        return Vec3.subtract(Vec3.max(a, b), Vec3.min(a, b)).add(1);
    }

    /**
     * @param {Vec3Like} a 範囲の一端となるベクトル
     * @param {Vec3Like} b 範囲の一端となるベクトル
     * @remarks
     * 2点 a, b で囲まれる直方体の体積
     */
    static volume(a, b) {
        const size = Vec3.size(a, b);
        return size.x * size.y * size.z;
    }

    /**
     * @param {...Vec3Like} vector 加算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに加算した結果のベクトル
     */
    add(...vector) {
        return Vec3.add(this, ...vector);
    }

    /**
     * @param {...Vec3Like} vector 減算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに減算した結果のベクトル
     */
    subtract(...vector) {
        return Vec3.subtract(this, ...vector);
    }

    /**
     * @param {...Vec3Like} vector 乗算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに乗算した結果のベクトル
     */
    multiply(...vector) {
        return Vec3.multiply(this, ...vector);
    }

    /**
     * @param {...Vec3Like} vector 除算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに除算した結果のベクトル
     */
    divide(...vector) {
        return Vec3.divide(this, ...vector);
    }

    /**
     * @param {number} n 指数
     * @remarks
     * ベクトルの各成分を n 乗したベクトル
     */
    pow(n) {
        return Vec3.pow(this, n);
    }

    /**
     * @remarks
     * ベクトルの各成分を切り上げたベクトル
     */
    ceil() {
        return Vec3.ceil(this);
    }

    /**
     * @remarks
     * ベクトルの各成分を四捨五入したベクトル
     */
    round() {
        return Vec3.round(this);
    }

    /**
     * @remarks
     * ベクトルの各成分を切り捨てたベクトル
     */
    floor() {
        return Vec3.floor(this);
    }

    /**
     * @remarks
     * ベクトルの各成分の絶対値を取ったベクトル
     */
    abs() {
        return Vec3.abs(this);
    }

    /**
     * @remarks
     * ベクトルの各成分の符号を取ったベクトル
     */
    sign() {
        return Vec3.sign(this);
    }

    /**
     * @param {number} n 小数点以下の桁数
     * @remarks
     * ベクトルの各成分を少数第 n 桁で四捨五入したベクトル
     */
    fixed(n) {
        return Vec3.fixed(this, n);
    }

    /**
     * @param {Vec3Like} min 最小値ベクトル
     * @param {Vec3Like} max 最大値ベクトル
     * @remarks
     * ベクトルの各成分を min と max の範囲に収めたベクトル
     */
    clamp(min, max) {
        return Vec3.clamp(this, min, max);
    }

    /**
     * @remarks
     * ベクトルの大きさ（ユークリッドノルム）
     */
    magnitude() {
        return Vec3.magnitude(this);
    }

    /**
     * @remarks
     * ベクトルを正規化した単位ベクトル
     */
    normalize() {
        return Vec3.normalize(this);
    }

    /**
     * @param {Vec3Like} vec 外積の右項となるベクトル
     * @remarks
     * 2つのベクトルの外積
     */
    cross(vec) {
        return Vec3.cross(this, vec);
    }

    /**
     * @param {Vec3Like} vec 内積の右項となるベクトル
     * @remarks
     * 2つのベクトルの内積
     */
    dot(vec) {
        return Vec3.dot(this, vec);
    }

    /**
     * @param {Vec3Like} vec 比較対象となるベクトル
     * @remarks
     * 2つのベクトル間の角度（ラジアン）
     */
    angleBetween(vec) {
        return Vec3.angleBetween(this, vec);
    }

    /**
     * @param {Vec3Like} vec 射影先の方向ベクトル
     * @remarks
     * ベクトル a をベクトル b の方向へ射影したベクトル (正射影)
     */
    projection(vec) {
        return Vec3.projection(this, vec);
    }

    /**
     * @param {Vec3Like} vec 射影方向のベクトル
     * @remarks
     * ベクトル a から b 方向への射影成分を除いたベクトル (反射影)
     */
    rejection(vec) {
        return Vec3.rejection(this, vec);
    }

    /**
     * @param {Vec3Like} vec 反射面の法線方向を表すベクトル
     * @remarks
     * 法線ベクトルで定義される面に対して、入射ベクトルを反射させた結果のベクトル
     */
    reflect(vec) {
        return Vec3.reflect(this, vec);
    }

    /**
     * @param {number} x x座標の値
     * @remarks
     * ベクトルのx座標を絶対座標で変更する
     */
    setX(x) {
        return new Vec3(x, this.y, this.z);
    }

    /**
     * @param {number} y y座標の値
     * @remarks
     * ベクトルのy座標を絶対座標で変更する
     */
    setY(y) {
        return new Vec3(this.x, y, this.z);
    }

    /**
     * @param {number} z z座標の値
     * @remarks
     * ベクトルのz座標を絶対座標で変更する
     */
    setZ(z) {
        return new Vec3(this.x, this.y, z);
    }

    /**
     * @param {number} x x成分のオフセット
     * @param {number} y y成分のオフセット
     * @param {number} z z成分のオフセット
     * @remarks
     * ベクトルの各成分を相対座標で変更する
     */
    offset(x, y, z) {
        return Vec3.add(this, new Vec3(x, y, z));
    }

    /**
     * @param {number} x x成分のオフセット
     * @remarks
     * ベクトルのx成分を相対座標で変更する
     */
    offsetX(x) {
        return this.offset(x, 0, 0);
    }

    /**
     * @param {number} y y成分のオフセット
     * @remarks
     * ベクトルのy成分を相対座標で変更する
     */
    offsetY(y) {
        return this.offset(0, y, 0);
    }

    /**
     * @param {number} z z成分のオフセット
     * @remarks
     * ベクトルのz成分を相対座標で変更する
     */
    offsetZ(z) {
        return this.offset(0, 0, z);
    }

    /**
     * @param {number} x x成分のオフセット
     * @param {number} y y成分のオフセット
     * @param {number} z z成分のオフセット
     * @param {Vec3Like} dirct 単位方向ベクトル
     * @remarks
     * ベクトルの各成分をローカル座標で変更する
     */
    offsetLocal(x, y, z, dirct) {
        const zVec = Vec3.from(dirct);
        const xVec = Vec3.normalize(new Vec3(zVec.z, 0, -zVec.x));
        const yVec = Vec3.cross(zVec, xVec);
        return Vec3.add(this, Vec3.multiply(xVec, x), Vec3.multiply(yVec, y), Vec3.multiply(zVec, z));
    }

    /**
     * @param {number} x x成分のオフセット
     * @param {Vec3Like} dirct 単位方向ベクトル
     * @remarks
     * ベクトルのx成分をローカル座標で変更する
     */
    offsetLocalX(x, dirct) {
        return this.offsetLocal(x, 0, 0, dirct);
    }

    /**
     * @param {number} y y成分のオフセット
     * @param {Vec3Like} dirct 単位方向ベクトル
     * @remarks
     * ベクトルのy成分をローカル座標で変更する
     */
    offsetLocalY(y, dirct) {
        return this.offsetLocal(0, y, 0, dirct);
    }

    /**
     * @param {number} z z成分のオフセット
     * @param {Vec3Like} dirct 単位方向ベクトル
     * @remarks
     * ベクトルのz成分をローカル座標で変更する
     */
    offsetLocalZ(z, dirct) {
        return this.offsetLocal(0, 0, z, dirct);
    }

    /**
     * @param {number} angle 回転角
     * @param {Vec3Like} origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（X軸回転）
     */
    rotateX(angle, origin) {
        return Vec3.rotateX(this, angle, origin);
    }

    /**
     * @param {number} angle 回転角
     * @param {Vec3Like} origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Y軸回転）
     */
    rotateY(angle, origin) {
        return Vec3.rotateY(this, angle, origin);
    }

    /**
     * @param {number} angle 回転角
     * @param {Vec3Like} origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Z軸回転）
     */
    rotateZ(angle, origin) {
        return Vec3.rotateZ(this, angle, origin);
    }

    /**
     * @param {Vec3Like} vec 比較対象となるベクトル
     * @param {string} axis 比較を行う軸指定
     * @remarks
     * 指定した軸成分について、2つのベクトルが等しいかを判定する
     */
    equals(vec, axis) {
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
    toArray() {
        return [this.x, this.y, this.z];
    }

    /**
     * @remarks
     * JSON形式に変換する
     */
    toJSON() {
        return { x: this.x, y: this.y, z: this.z };
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}