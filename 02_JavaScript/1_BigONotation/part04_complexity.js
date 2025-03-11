/**
  [time complexity] - 특정 크기의 입력을 기준으로 할 때 필요한 연산의 횟수


 [space complexity] - 프로그램 실행과 완료에 얼마나 많은 공간(메모리)가 필요한지 
 -> space complexity in JS
 1) Most primitives are constant space (Booleans, numbers, undefined, null)
 2) Sting의 경우 O(n) 복잡도 -> 문자열 길이만큼 입력값 늘어남
 3) Reference type are generally O(n), where n is the length(for arrays) or the number of keys(for objects)
 */

//ex01 => Number constant space => O(1)
const sum = (array) => {
  let total = 0; //number
  for (let i = 0; i < array.length; i++) {
    total += array[i]; // number
  }
  return total;
};

//ex02 => Array 배열이 커질 수록 return되는 new Array 커짐 O(n)

const double = (array) => {
  let newArr = []; // array 입력 값에 따라 배열의 크기가 커지게됨
  for (let i = 0; i < array.length; i++) {
    newArr.push(array[i]); 
  }
  return newArr; // n numbers
};
