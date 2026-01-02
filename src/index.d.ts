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
export declare class Vec3 {
    /**
     * @param x 
     * @param y 
     * @param z 
     */
    constructor(x?: string | number, y?: string | number, z?: string | number);

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
    static readonly ZERO: Vec3;

    /**
     * @remarks
     * 成分がそれぞれ1のベクトル
     */
    static readonly POSITIVE: Vec3;

    /**
     * @remarks
     * 成分がそれぞれ-1のベクトル
     */
    static readonly NEGATIVE: Vec3;

    /**
     * @remarks
     * 成分がそれぞれ正の無限大のベクトル
     */
    static readonly POSITIVE_INFINITY: Vec3;

    /**
     * @remarks
     * 成分がそれぞれ負の無限大のベクトル
     */
    static readonly NEGATIVE_INFINITY: Vec3;

    /**
     * @param object 値
     * @remarks
     * 値がVec3であるかを判断する
     */
    static isVec3(object: unknown): object is Vec3;

    /**
     * @param object 値
     * @param map パースした後の値
     * @remarks
     * 値をVec3にパースする
     */
    static from<V extends Vec3>(object: Vec3Like, map?: (vec: Vec3) => V): V;

    /**
     * @param vec 加算の基準となるベクトル
     * @param vector 加算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに加算した結果のベクトル
     */
    static add(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;

    /**
     * @param vec 減算の基準となるベクトル
     * @param vector 減算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに減算した結果のベクトル
     */
    static subtract(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;

    /**
     * @param vec 乗算の基準となるベクトル
     * @param vector 乗算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに乗算した結果のベクトル
     */
    static multiply(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;

    /**
     * @param vec 除算の基準となるベクトル
     * @param vector 除算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに除算した結果のベクトル
     */
    static divide(vec: Vec3Like, ...vector: Vec3Like[]): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @param n 指数
     * @remarks
     * ベクトルの各成分を n 乗したベクトル
     */
    static pow(vec: Vec3Like, n: number): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を切り上げたベクトル
     */
    static ceil(vec: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を四捨五入したベクトル
     */
    static round(vec: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分を切り捨てたベクトル
     */
    static floor(vec: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分の絶対値を取ったベクトル
     */
    static abs(vec: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの各成分の符号を取ったベクトル
     */
    static sign(vec: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @param n 小数点以下の桁数
     * @remarks
     * ベクトルの各成分を少数第 n 桁で四捨五入したベクトル
     */
    static fixed(vec: Vec3Like, n: number): Vec3;

    /**
     * @param vector 比較対象となるベクトル群
     * @remarks
     * 複数ベクトルの各成分ごとの最小値からなるベクトル
     */
    static min(...vector: Vec3Like[]): Vec3;

    /**
     * @param vector 比較対象となるベクトル群
     * @remarks
     * 複数ベクトルの各成分ごとの最大値からなるベクトル
     */
    static max(...vector: Vec3Like[]): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @param min 最小値ベクトル
     * @param max 最大値ベクトル
     * @remarks
     * ベクトルの各成分を min と max の範囲に収めたベクトル
     */
    static clamp(vec: Vec3Like, min: Vec3Like, max: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルの大きさ（ユークリッドノルム）
     */
    static magnitude(vec: Vec3Like): number;

    /**
     * @param vec 対象となるベクトル
     * @remarks
     * ベクトルを正規化した単位ベクトル
     */
    static normalize(vec: Vec3Like): Vec3;

    /**
     * @param a 外積の左項となるベクトル
     * @param b 外積の右項となるベクトル
     * @remarks
     * 2つのベクトルの外積
     */
    static cross(a: Vec3Like, b: Vec3Like): Vec3;

    /**
     * @param a 内積の左項となるベクトル
     * @param b 内積の右項となるベクトル
     * @remarks
     * 2つのベクトルの内積
     */
    static dot(a: Vec3Like, b: Vec3Like): number;

    /**
     * @param a 比較対象となるベクトル
     * @param b 比較対象となるベクトル
     * @remarks
     * 2つのベクトル間の角度（ラジアン）
     */
    static angleBetween(a: Vec3Like, b: Vec3Like): number;

    /**
     * @param a 射影されるベクトル
     * @param b 射影先の方向ベクトル
     * @remarks
     * ベクトル a をベクトル b の方向へ射影したベクトル (正射影)
     */
    static projection(a: Vec3Like, b: Vec3Like): Vec3;

    /**
     * @param a 対象となるベクトル
     * @param b 射影方向のベクトル
     * @remarks
     * ベクトル a から b 方向への射影成分を除いたベクトル (反射影)
     */
    static rejection(a: Vec3Like, b: Vec3Like): Vec3;

    /**
     * @param vec 入射方向を表すベクトル
     * @param n 反射面の法線方向を表すベクトル
     * @remarks
     * 法線ベクトルで定義される面に対して、入射ベクトルを反射させた結果のベクトル
     */
    static reflect(vec: Vec3Like, n: Vec3Like): Vec3;

    /**
     * @param a 補間の始点となるベクトル
     * @param b 補間の終点となるベクトル
     * @param t 補間係数
     * @remarks
     * 始点と終点の間を、補間係数 t（0~1）に基づいて線形補間したベクトル
     */
    static lerp(a: Vec3Like, b: Vec3Like, t: number): Vec3;

    /**
     * @param a 始点となるベクトル
     * @param b 終点となるベクトル
     * @param t 補間係数
     * @remarks
     * 始点と終点の間を、補間係数 t（0~1）に基づいて球面線形補間したベクトル
     */
    static slerp(a: Vec3Like, b: Vec3Like, t: number): Vec3;

    /**
     * @param a 始点となるベクトル
     * @param b 終点となるベクトル
     * @remarks
     * 2点 a, b 間の距離
     */
    static distance(a: Vec3Like, b: Vec3Like): number;

    /**
     * @param origin 中心点となるベクトル
     * @param radius 半径
     * @param angle 角度
     * @remarks
     * origin を中心点とし、半径 radius、角度 angle に対応する円周上の点
     */
    static circle(origin: Vec3Like, radius: number, angle: number): Vec3;

    /**
     * @param origin 中心点となるベクトル
     * @param radius 半径
     * @param longitude 経度
     * @param latitude 緯度
     * @remarks
     * origin を中心点とし、半径 radius、経度 longitude、緯度 latitude に対応する球面上の点
     */
    static sphere(origin: Vec3Like, radius: number, longitude: number, latitude: number): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（X軸回転）
     */
    static rotateX(vec: Vec3Like, angle: number, origin?: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Y軸回転）
     */
    static rotateY(vec: Vec3Like, angle: number, origin?: Vec3Like): Vec3;

    /**
     * @param vec 対象となるベクトル
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Z軸回転）
     */
    static rotateZ(vec: Vec3Like, angle: number, origin?: Vec3Like): Vec3;

    /**
     * @param a 始点となるベクトル
     * @param b 終点となるベクトル
     * @remarks
     * 点 a から点 b への単位方向ベクトル
     */
    static facDirection(a: Vec3Like, b: Vec3Like): Vec3;

    /**
     * @param rot 回転角を表すベクトル
     * @remarks
     * 回転ベクトル（度数法）から単位方向ベクトルを取得する
     */
    static rotDirection(rot: VectorXY): Vec3;

    /**
     * @param a 比較対象となるベクトル
     * @param b 比較対象となるベクトル
     * @param axis 比較を行う軸指定
     * @remarks
     * 指定した軸成分について、2つのベクトルが等しいかを判定する
     */
    static equals(a: Vec3Like, b: Vec3Like, axis?: `${"x" | ""}${"y" | ""}${"z" | ""}`): boolean;

    /**
     * @param a 範囲の一端となるベクトル
     * @param b 範囲の一端となるベクトル
     * @remarks
     * 2点 a, b で囲まれる直方体の各軸方向のサイズ（両端含む）
     */
    static size(a: Vec3Like, b: Vec3Like): Vec3;

    /**
     * @param a 範囲の一端となるベクトル
     * @param b 範囲の一端となるベクトル
     * @remarks
     * 2点 a, b で囲まれる直方体の体積
     */
    static volume(a: Vec3Like, b: Vec3Like): number;

    /**
     * @param vector 加算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに加算した結果のベクトル
     */
    add(...vector: Vec3Like[]): Vec3;

    /**
     * @param vector 減算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに減算した結果のベクトル
     */
    subtract(...vector: Vec3Like[]): Vec3;

    /**
     * @param vector 乗算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに乗算した結果のベクトル
     */
    multiply(...vector: Vec3Like[]): Vec3;

    /**
     * @param vector 除算するベクトル群
     * @remarks
     * 複数のベクトルを成分ごとに除算した結果のベクトル
     */
    divide(...vector: Vec3Like[]): Vec3;

    /**
     * @param n 指数
     * @remarks
     * ベクトルの各成分を n 乗したベクトル
     */
    pow(n: number): Vec3;

    /**
     * @remarks
     * ベクトルの各成分を切り上げたベクトル
     */
    ceil(): Vec3;

    /**
     * @remarks
     * ベクトルの各成分を四捨五入したベクトル
     */
    round(): Vec3;

    /**
     * @remarks
     * ベクトルの各成分を切り捨てたベクトル
     */
    floor(): Vec3;

    /**
     * @remarks
     * ベクトルの各成分の絶対値を取ったベクトル
     */
    abs(): Vec3;

    /**
     * @remarks
     * ベクトルの各成分の符号を取ったベクトル
     */
    sign(): Vec3;

    /**
     * @param n 小数点以下の桁数
     * @remarks
     * ベクトルの各成分を少数第 n 桁で四捨五入したベクトル
     */
    fixed(n: number): Vec3;

    /**
     * @param min 最小値ベクトル
     * @param max 最大値ベクトル
     * @remarks
     * ベクトルの各成分を min と max の範囲に収めたベクトル
     */
    clamp(min: Vec3Like, max: Vec3Like): Vec3;

    /**
     * @remarks
     * ベクトルの大きさ（ユークリッドノルム）
     */
    magnitude(): number;

    /**
     * @remarks
     * ベクトルを正規化した単位ベクトル
     */
    normalize(): Vec3;

    /**
     * @param vec 外積の右項となるベクトル
     * @remarks
     * 2つのベクトルの外積
     */
    cross(vec: Vec3Like): Vec3;

    /**
     * @param vec 内積の右項となるベクトル
     * @remarks
     * 2つのベクトルの内積
     */
    dot(vec: Vec3Like): number;

    /**
     * @param vec 比較対象となるベクトル
     * @remarks
     * 2つのベクトル間の角度（ラジアン）
     */
    angleBetween(vec: Vec3Like): number;

    /**
     * @param vec 射影先の方向ベクトル
     * @remarks
     * ベクトル a をベクトル b の方向へ射影したベクトル (正射影)
     */
    projection(vec: Vec3Like): Vec3;

    /**
     * @param vec 射影方向のベクトル
     * @remarks
     * ベクトル a から b 方向への射影成分を除いたベクトル (反射影)
     */
    rejection(vec: Vec3Like): Vec3;

    /**
     * @param vec 反射面の法線方向を表すベクトル
     * @remarks
     * 法線ベクトルで定義される面に対して、入射ベクトルを反射させた結果のベクトル
     */
    reflect(vec: Vec3Like): Vec3;

    /**
     * @param x x座標の値
     * @remarks
     * ベクトルのx座標を絶対座標で変更する
     */
    setX(x: number): Vec3;

    /**
     * @param y y座標の値
     * @remarks
     * ベクトルのy座標を絶対座標で変更する
     */
    setY(y: number): Vec3;

    /**
     * @param z z座標の値
     * @remarks
     * ベクトルのz座標を絶対座標で変更する
     */
    setZ(z: number): Vec3;

    /**
     * @param x x成分のオフセット
     * @param y y成分のオフセット
     * @param z z成分のオフセット
     * @remarks
     * ベクトルの各成分を相対座標で変更する
     */
    offset(x: number, y: number, z: number): Vec3;

    /**
     * @param x x成分のオフセット
     * @remarks
     * ベクトルのx成分を相対座標で変更する
     */
    offsetX(x: number): Vec3;

    /**
     * @param y y成分のオフセット
     * @remarks
     * ベクトルのy成分を相対座標で変更する
     */
    offsetY(y: number): Vec3;

    /**
     * @param z z成分のオフセット
     * @remarks
     * ベクトルのz成分を相対座標で変更する
     */
    offsetZ(z: number): Vec3;

    /**
     * @param x x成分のオフセット
     * @param y y成分のオフセット
     * @param z z成分のオフセット
     * @param dirct 単位方向ベクトル
     * @remarks
     * ベクトルの各成分をローカル座標で変更する
     */
    offsetLocal(x: number, y: number, z: number, dirct: Vec3Like): Vec3;

    /**
     * @param x x成分のオフセット
     * @param dirct 単位方向ベクトル
     * @remarks
     * ベクトルのx成分をローカル座標で変更する
     */
    offsetLocalX(x: number, dirct: Vec3Like): Vec3;

    /**
     * @param y y成分のオフセット
     * @param dirct 単位方向ベクトル
     * @remarks
     * ベクトルのy成分をローカル座標で変更する
     */
    offsetLocalY(y: number, dirct: Vec3Like): Vec3;

    /**
     * @param z z成分のオフセット
     * @param dirct 単位方向ベクトル
     * @remarks
     * ベクトルのz成分をローカル座標で変更する
     */
    offsetLocalZ(z: number, dirct: Vec3Like): Vec3;

    /**
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（X軸回転）
     */
    rotateX(angle: number, origin?: Vec3Like): Vec3;

    /**
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Y軸回転）
     */
    rotateY(angle: number, origin?: Vec3Like): Vec3;

    /**
     * @param angle 回転角
     * @param origin 回転の中心点
     * @remarks
     * vec を origin を中心として angle だけ回転させたベクトル（Z軸回転）
     */
    rotateZ(angle: number, origin?: Vec3Like): Vec3;

    /**
     * @param vec 比較対象となるベクトル
     * @param axis 比較を行う軸指定
     * @remarks
     * 指定した軸成分について、2つのベクトルが等しいかを判定する
     */
    equals(vec: Vec3Like, axis?: `${"x" | ""}${"y" | ""}${"z" | ""}`): boolean;

    /**
     * @remarks
     * 文字列形式に変換する
     */
    toString(): string;

    /**
     * @remarks
     * 配列形式に変換する
     */
    toArray(): [x: number, y: number, z: number];

    /**
     * @remarks
     * JSON形式に変換する
     */
    toJSON(): Vector3;

    [Symbol.iterator](): IterableIterator<number>;
}