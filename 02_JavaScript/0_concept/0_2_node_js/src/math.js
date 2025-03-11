// math module
// ES Module system;

export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

export default function multiply(a, b) {
  return a * b;
}
// module내장 함수 객체 형태로 내보내기, 불러올 함수에 require로 객체 형태로 반환 가능
// module.exports = {
//   add,
//   sub,
// }
