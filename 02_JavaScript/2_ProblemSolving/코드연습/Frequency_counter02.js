/*
가변적인 수의 인자를 받아들이고 전달된 인자 중 중복이 있는지 확인하는 areThereDuplicates함수 구현, 
frequency counters 또는 multiple pointers 패턴 사용하여 문제 해결

제약조건 
  - 시간, 공간 복잡도 : O(n)

areThereDuplicates(1,2,3) // false
areThereDuplicates(1,2,2) // true
areThereDuplicates('a','b','c','a') //true

*/

// 다중 포인터로 풀어보려함
// 1. 가변적으로 인자를 받아야 하기 때문에 spread 연산자로 배열로 받음
// 2. 아무런 인자도 받지 않거나, 비교 할 수 없이 1개의 인자만 받게되면 false 리턴 아니라면 정렬 (문자열일때는 아스키코드 반환 후 정렬)
// 3. 변수 i 선언 중복이 아니라면 i++ , 입력 받음 값의 배열의 i 인덱스에 비교 값 할당
//    전부 순회가 끝나면 중복 있다면 return true 없으면 retrun false

const areThereDuplicates = (...vals) => {
  if (vals.length < 2) return false;
  const sortedArr = vals.sort((a, b) => {
    if (typeof a === 'string') {
      return a.charCodeAt() - b.charCodeAt();
    } else {
      return a - b;
    }
  });
  console.log(sortedArr);

  let i = 0;

  for (let k = 1; k < vals.length; k++) {
    if (vals[i] !== vals[k]) {
      vals[i] = vals[k];
    } else {
      return true;
    }
  }

  return false;
};

console.log(areThereDuplicates(1, 2, 3));
console.log(areThereDuplicates(1, 2, 2, 0));
console.log(areThereDuplicates('a', 'b', 'c', 'a'));

//해설집에는 스트링 문자에 대한 부분이 빠져 있어 제대로 된 값을 가져오지 않는다, 그냥..내가 한 풀이대로 하기로...!