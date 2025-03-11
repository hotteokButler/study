/*
두 개의 양의 정수가 주어졌을 때, 두 숫자의 구성이 같고 자릿수가 같은지 확인하는 sameFrequency 함수를 작성하시오
조건 : 시간복잡도는 O(n), 

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) //true
sameFrequency(22,222) // false

*/

// 1. 두 숫자의 자릿수가 다르면 굳이 비교 할 필요 없음, 숫자로만은 자릿수를 비교 할 수 없으므로 스트링으로 변환 후 자릿수 비교
// 2. 두 input에 대한 counter object 생성
// 3. 두번째 인풋 카운터 객체의 키 값을 순회하면서 key값이 있는지 , 그리고 서로 빈도수가 같은지 비교
// 4. 같으면 true 다르면 false 리턴

const sameFrequency = (int1, int2) => {
  const convInt1 = String(int1);
  const convInt2 = String(int2);
  if (convInt1.length !== convInt2.length) return false;

  const counterInt1 = {};
  const counterInt2 = {};

  for (const int of convInt1) {
    counterInt1[int] = (counterInt1[int] || 0) + 1;
  }

  for (const int of convInt2) {
    counterInt2[int] = (counterInt2[int] || 0) + 1;
  }

  for (const val in counterInt2) {
    if (!counterInt1[val]) {
      return false;
    } else if (counterInt1[val] !== counterInt2[val]) {
      return false;
    }
  }

  return true;
};

console.log(sameFrequency(182, 281));
console.log(sameFrequency(34, 14));
console.log(sameFrequency(3589578, 5879385));
console.log(sameFrequency(22, 222));
