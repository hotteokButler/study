/*
* [Truthy & Falsy] 
- 참이나 거짓을 의미하지 않는 값도, 조건문 내에서 참이나 거짓으로 평가하는 특징
*/

// - 1) Falsy한 값: 거짓으로 평가되는 값
let f1 = undefined;
let f2 = null;
let f3 = 0;
let f4 = -0;
let f5 = NaN;
let f6 = '';
let f7 = 0n; //big integer

// - 2) Truthy 참 같은 값
// -> 7가지의 Falsy 한 값들을 제외한 나머지 모든 값
// 예)
let t1 = 'hello world';
let t2 = ' ';
let t3 = 123;
let t4 = [];
let t5 = {};
let t6 = () => {};

// - 3) 활용 사례
// 객체 property 접근 다루기

function printName(person) {
  if (!person) {
    console.log('person 값이 없음');
    return;
  }
  console.log(person.name);
}

let person = { name: '호떡' };
printName(person);

let personUndefined = null;
printName(personUndefined);
