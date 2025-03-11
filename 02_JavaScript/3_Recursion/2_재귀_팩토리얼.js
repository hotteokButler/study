/*
[factorial 구하는 함수]

(팩토리얼 = 계승 : 1부터 n까지의 자연수를 모두 곱하는 것)
*/


// 풀이 보기 전 =>  솔루션과 동일

// 1. num이 1이 되면 멈춘다 (0이되면 어떤 수든 리턴 값이 0이 됨)
// 2. 숫자를 1씩 줄여가면서 재귀 함수 호출 * 인자로 받은 num 곱해줌
// => num이 1이 될 때 까지 재귀 호출

const getFactorial = (num) => {
  if (num === 1) return 1;
  return num * getFactorial(num - 1);
};

console.log(getFactorial(10)); //3628800
console.log(getFactorial(5)); 

