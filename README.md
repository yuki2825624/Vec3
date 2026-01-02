# Vec3
マインクラフト用の3次元ベクトルユーティリティライブラリです。
統合版マインクラフトのアドオン(ScriptAPI)用に作成しました。
加算・回転・補間・射影・反射などの数学的操作を簡潔に扱えます。

## 特徴
- 三次元ベクトル演算をほぼ網羅
- static / instance 両対応
- Immutable設計
- Iterable対応
- 入力型が柔軟
- 加算・回転・補間・射影・反射などの機能をサポート

## ビルド
必要ありません。すぐに使用出来るようにsrcフォルダ内にjsファイルを含めています。おまけとして.d.tsファイルも用意しました。

## 基本的な扱い

#### ベクトルの作成

```ts
// インスタンス
new Vec3(1, 2, 3);        // (1, 2, 3)

// fromメソッド
Vec3.from(2);             // (2, 2, 2)
Vec3.from("2 4 6");       // (2, 4, 6)
Vec3.from([5, 6, 7]);     // (5, 6, 7)
Vec3.from({ x: 1, y: 2 }); // (1, 2, 0)

// 定数ベクトル
Vec3.ZERO;                // (0, 0, 0)
Vec3.POSITIVE;            // (1, 1, 1)
Vec3.NEGATIVE;            // (-1, -1, -1)
```

#### 基本演算

```ts
// 加算
Vec3.add(a, b, c);
a.add(b, c);

// 減算
Vec3.subtract(a, b);
a.subtract(b);

// 乗算
Vec3.multiply(a, b);
a.multiply(b);

// 除算
Vec3.divide(a, b);
a.divide(b);
```

#### 大きさ・正規化

```ts
// 大きさ（ノルム）
Vec3.magnitude(v);
v.magnitude();

// 正規化
Vec3.normalize(v);
v.normalize();
```

#### 内積・外積

```ts
// 内積
Vec3.dot(a, b);
a.dot(b);

// 外積
Vec3.cross(a, b);
a.cross(b);
```

#### 距離・角度

```ts
// 距離
Vec3.distance(a, b);

// 角度（ラジアン）
Vec3.angleBetween(a, b);
a.angleBetween(b);
```

#### 補間

```ts
// 線形補間（LERP）
Vec3.lerp(a, b, 0.5);

// 球面線形補間（SLERP）
Vec3.slerp(a, b, 0.5);
```

#### 射影・反射

```ts
// 正射影
Vec3.projection(a, b);
a.projection(b);

// 反射影
Vec3.rejection(a, b);
a.rejection(b);

// 反射
Vec3.reflect(v, normal);
v.reflect(normal);
```

#### 回転

```ts
// X/Y/Z 軸回転
Vec3.rotateX(v, angle);
Vec3.rotateY(v, angle);
Vec3.rotateZ(v, angle);

v.rotateX(angle);
v.rotateY(angle);
v.rotateZ(angle);

// 回転中心指定
Vec3.rotateY(v, angle, origin);
v.rotateY(angle, origin);
```

#### クランプ・最小最大

```ts
// 最小・最大
Vec3.min(a, b, c);
Vec3.max(a, b, c);

// クランプ
Vec3.clamp(v, min, max);
v.clamp(min, max);
```

#### 成分操作

```ts
// 絶対座標
v.setX(10);
v.setY(5);
v.setZ(-2);

// 相対座標
v.offset(1, 2, 3);
v.offsetX(1);
v.offsetY(1);
v.offsetZ(1);
```

#### ローカル座標操作

```ts
// const direction = <Entity>.getViewDirection()

// 向きベクトルを基準に移動
v.offsetLocal(x, y, z, direction);

v.offsetLocalX(x, direction);
v.offsetLocalY(y, direction);
v.offsetLocalZ(z, direction);
```

#### 数値操作

```ts
// 切り上げ・四捨五入・切り捨て
Vec3.ceil(v);
Vec3.round(v);
Vec3.floor(v);

v.ceil();
v.round();
v.floor();

// 絶対値・符号
Vec3.abs(v);
Vec3.sign(v);

// 小数点以下 n 桁
Vec3.fixed(v, 2);
v.fixed(2);
```

#### 比較

```ts
// 全成分比較
Vec3.equals(a, b);
a.equals(b);

// 軸指定
Vec3.equals(a, b, "xz");
a.equals(b, "xy");
```

#### 範囲・サイズ

```ts
// サイズ（両端含む）
Vec3.size(a, b);

// 体積
Vec3.volume(a, b);
```

#### 座標生成

```ts
// 円周上の点
Vec3.circle(origin, radius, angle);

// 球面上の点
Vec3.sphere(origin, radius, longitude, latitude);
```

#### 変換

```ts
v.toString(); // "x y z"
v.toArray();  // [x, y, z]
v.toJSON();   // { x, y, z }

// Iterable
for (const n of v) {
    console.log(n);
}
```

# LICENSE
MIT License