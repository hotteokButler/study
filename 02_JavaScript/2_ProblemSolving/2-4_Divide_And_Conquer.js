/*
[Divide and Conquer] - 분할과 정복 패턴

- 데이터셋을 작은 부분으로 나누고 데이터의 하위집합으로 프로세스를 반복
- 시간복잡도를 크게 줄일 수 있다
- 퀵 정렬, 병합 정렬, 이진 탐색
*/

/*
(ex1) 정렬된 숫자 배열과 검색하려는 숫자를 인자로 받아 해당 위치의 인덱스를 반환하는 함수 search를 작성하시오
      (단, 값이 없을 경우 -1을 리턴한다)

      search([1,2,3,4,5,6],4) // 3
      search([1,2,3,4,5,6],6)  // 5
      search([1,2,3,4,5,6],11) // -1
*/

//시간복잡도 O(N) solution => 나도 처음에 생각한거..
const searchN = (arr, num) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) return i;
  }
  return -1;
};

console.log('searchN');
console.log(searchN([1, 2, 3, 4, 5, 6], 4)); // 3
console.log(searchN([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(searchN([1, 2, 3, 4, 5, 6], 11)); // -1

//Binary Search 이진탐색 = 시간복잡도 Log(N)

const search = (arr, num) => {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    let currentElem = arr[mid];

    if (currentElem < num) {
      min = mid + 1;
    } else if (currentElem > num) {
      max = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

console.log('search');
console.log(search([1, 2, 3, 4, 5, 6], 4)); // 3
console.log(search([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(search([1, 2, 3, 4, 5, 6], 11)); // -1