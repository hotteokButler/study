/*
[Multiple Pointers] - two pointers라고도 불림

-인덱스 또는 위치 해당하는 포인터와 값을 생성하고 특정 조건 기준으로 처음 끝 중간으로 이동.
공간 복잡성을 최소화하면서 문제를 해결하는데 효율적

- 한 쌍의 값이나 조건을 충족시키는 것을 찾는 방식 (보통은 한 쌍을 찾는데 사용)

- 두 개의 포인터를 생성

*/

/* 
(ex01) 정렬된 정수의 배열를 받아 합이 0이 되는 한쌍의 숫자를 배열 형태로 리턴하는 sumZero 함수를 작성하시오. 
(합이 0인 한 쌍이 존재하지 않으면 undefined 리턴)

sumZero([-3,-2,-1,0,1,2,3]) // [-3,-3]
sumZero([-2,0,1,3]) // undefined
sumZero([1,2,3]) // undefined
*/

// 내 풀이
const sumZero = (intArr) => {
  // 다중포인터 -> 한쌍의 값을 찾으므로 포인터를 두 개 사용 한다?
  // 처음 끝 양쪽에서부터 이동하며 비교
  // 합이 0 이면 한쌍의 배열 리턴
  // 합이 양수 끝 포인터 --
  // 합이 음수 시작 포인터 ++
  // 끝 포인터 - 시작 포인터 => 음수라면 비교 끝 return

  let left = 0; //첨
  let right = intArr.length - 1; //끝
  while (left < right) {
    const sum = intArr[left] + intArr[right];
    if (sum === 0) return [intArr[left], intArr[right]];
    else if (sum > 0) right--;
    else left++;
  }
};

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]));
console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7])); //
console.log(sumZero([-2, 0, 1, 3]));
console.log(sumZero([1, 2, 3]));

/* ===== 풀이 시작  ===== */
// nested loop를 사용한 케이스 => 시간복잡도 O(n^2) , 공간 복잡도 O(1);
const sumZeroUseNL = (intArr) => {
  for (let i = 0; i < intArr.length; i++) {
    for (let j = j + 1; j < intArr.length; j++) {
      if (intArr[i] + intArr[j] === 0) {
        return [intArr[i], intArr[j]];
      }
    }
  }
};

// 시간 복잡도 O(N), 공간 복잡도 O(1) => 내풀이 동일

/*
(ex02) - 정렬된 정수의 배열을 받아 배열의 고유값의 갯수를 리턴하는 countUniqueValues 함수를 작성하시오
(음수가 올 수 있다, 배열은 항상 sort된 상태이다)

countUniqueValues([1,1,1,1,1,2])//2
countUniqueValues([1,2,3,4,4,4,5,5,12,12,13]) //7
countUniqueValues([])//0
countUniqueValues([-2,-1,-1,0,1]) //3
*/

const countUniqueValues = (intArr) => {
  //음수가 배열의 요소로 올 수 있음 -> ex)  [-1,1] => -1과 1 고유값 2가지
  //포인터 2개 선언
  //  - 두개의 포인터를 증가 시키면서 서로 비교,
  //  - 선증가된 비교값의 포인터가 배열의 마지막 인덱스가 되면 종료 후 갯수 반환
  //  - 빈 배열을 받으면 무조건 0 리턴 => 따라서 count의 초기값은 1

  if (intArr.length === 0) return 0;

  let basis = 0;
  let round = 1;
  let count = 1;

  while (round < intArr.length) {
    const baseElem = intArr[basis];
    const roundElem = intArr[round];

    if (baseElem !== roundElem) count++;

    basis++;
    round++;
  }

  return count;
};

//수정 필요
console.log('countUniqueValues');
console.log(countUniqueValues([1, 1, 1, 1, 1, 2]));
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 5, 5, 12, 12, 13]));
console.log(countUniqueValues([]));
console.log(countUniqueValues([-2, -1, -1, 0, 1]));

// solution- ex02

/*

basis : 기준점 
round : index를 증가시키며 비교하는 값

basis와 round 위치의 같으면 round 인덱스 증가
basis와 round 위치의 값이 다르면 basis 인덱스 증가 후 해당 자리에 비교값 할당, round 인덱스 증가 

해당 작업 반복 후 round의 인덱스가 배열 마지막 인덱스가 되면 basis 의 index+1(인덱스는 0부터 시작하므로) 리턴

*/

// const solCountuniqueValues = (intArr) => {
//   if (intArr.length === 0) return 0; // 빈 배열은 비교 할 필요 없으니 바로 0 리턴

//   let basis = 0;
//   let round = 1;

//   while (round < intArr.length) {

//     if (intArr[basis] !== intArr[round]) {
//       basis++;
//       intArr[basis] = intArr[round];
//     }

//     round++;
//   }

//   return basis + 1;
// };

const solCountuniqueValues = (intArr) => {
  if (intArr.length === 0) return 0; // 빈 배열은 비교 할 필요 없으니 바로 0 리턴
  let i = 0;
  for (let j = 0; j < intArr.length; j++) {
      if(intArr[i] !== intArr[j]) {
      i++;
      intArr[i] = intArr[j];
      }
  }

  return i + 1;
};

console.log('solCountuniqueValues');
console.log(solCountuniqueValues([1, 1, 1, 1, 1, 2, 3]));
console.log(solCountuniqueValues([1, 2, 3, 4, 4, 4, 5, 5, 12, 12, 13]));
console.log(solCountuniqueValues([]));
console.log(solCountuniqueValues([-2, -1, -1, 0, 1]));
