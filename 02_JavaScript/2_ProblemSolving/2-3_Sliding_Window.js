/*
[Sliding Window]

- 한 위치에서 다른 위치로 이동 할 수 있는 window(고정된 사이즈-특정 범위)를 생성, 내부 요소의 값을 이용하는 패턴
  (window - 단일 변수, 하위 배열 또는 필요한 경우 다른 문자열도 될 수 있음)
  (이동은 보통 왼쪽에서 오른쪽, 즉 요소의 시작 위치, 또는 배열이나 문자열의 시작 위치에서 끝나는 위치로 이동)
- 특정 조건에 따라 window는 증가하거나 닫히거나 새로 생성 될 수 있다
- 배열과 문자열에서 데이터의 하위 집합을 추적하는데 유용함
- 투포인터와 비슷한 부분이 있다

*/

/*
(ex01)정수 배열과 n이라는 숫자를 받아
      해당 배열에서 n만큼 연속된 요소의 합의 최대값을 계산하는 
      maxSubarraySum이라는 함수를 작성하시오. 

      maxSubarraySum([1,2,5,2,8,1,5],2) // 10
      maxSubarraySum([1,2,5,2,8,1,5],4) // 17
      maxSubarraySum([4,2,1,6],1) //6
      maxSubarraySum([4,2,1,6,2],4) // 13
      maxSubarraySum([],4) // null
*/


// 해답 보기 전
const maxSubarraySum = (arr, n) => {
  // 빈 배열 또는 조건에 맞지 않을 경우 null -> 배열의 길이보다 n의 숫자가 클때
  if (arr.length < n) return null;

  let result = 0;
  let tempSum = 0;

  for (let i = 0; i < n; i++) { // 시작값 연속된 n갯수 만큼 합
    result += arr[i];
  }

  tempSum = result;

  for (let j = n; j < arr.length; j++) {
    //window는 고정값이므로 한칸씩 이동하므로 이전 첫 요소 빼고 다음 요소 더함
    tempSum = tempSum - arr[j - n] + arr[j];
    // result와 tempSum 중 큰 값을 result에 할당
    result = Math.max(result, tempSum);
  }

  return result;
};

console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log(maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4)); // 17
console.log(maxSubarraySum([4, 2, 1, 6], 1)); //6
console.log(maxSubarraySum([4, 2, 1, 6, 2], 4)); // 13
console.log(maxSubarraySum([], 4)); // null


// 풀이 =>  풀이와 동일, 시간 복잡도는 O(N)