import { Vec3 } from "./index";

const vec = new Vec3(10.5, 20, -10);

// Vec3 to string
console.log(vec.toString()); // 10.5 20 -10

// offset from Vec3
console.log(vec.offset(10, 5, 10).toString()); // 20.5 25 0

// Math.abs
console.log(vec.abs().toString()); // 10.5 20 10

// Math.ceil
console.log(vec.floor().toString()); // 10 20 -10

// add
console.log(vec.add(new Vec3(0.2, 0.5, 0.7)).toString()); // 10.7 20.5 -9.3

// multiply
console.log(vec.multiply(2).toString()); // 21 40 -20

// equals 1
console.log(vec.equals(new Vec3(10.5, 20, 10))); // false

// equals 2
console.log(vec.equals(new Vec3(10.5, 20, 10), "xy")); // true

// etc...