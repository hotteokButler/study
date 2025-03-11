/*

 정렬된 정수 배열과 평균을 인자로 받아, 배열 안에 평균과 같은 값의 쌍이 있는지 확인 후 
 true 또는 false를 리턴하는 averagePair 함수를 작성하시오.
 (목표 평균과 일치하는 쌍이 두 개 이상 있을 수 있다)

 averagePair([1,2,3],2.5); // true
 averagePair([1,3,3,5,6,7,10,12,19],8); //true
 averagePair([-1,0,3,4,5,6], 4.1); //false
 averagePair([],4); //false
*/

// 1. 배열의 인자가 2개 이상이어야지 평균을 구할 수 있으므로 2개 미만의 배열이 주어지면 false 리턴
// 2. 소숫점 자리수에 대한 언급은 없지만 소수점 첫째 자리 까지 반올림 후 비교 => 오류 발생 변환 없이 비교 필요
//    - 비교기준 : 서로 끝과 끝에서 중간으로 이동하며 비교
//    - 평균 값보다 클 경우 끝 포인터--
//    - 평균 보다 작을 경우 첫 포인터++
//    - 끝 포인터 - 첫 포인터 < 0 이면 함수 종료
// 3. 값의 쌍을 리턴하는 게 아닌 존재 유무만 확인하므로 최초 한쌍이 나오면 바로 true 리턴

const averagePair = (arr, avg) => {
  if (arr.length < 2) return false;
  let first = 0;
  let end = arr.length - 1;

  while (first < end) {
    const avgPair = (arr[first] + arr[end]) / 2;
    if (avgPair < avg) {
      first++;
    } else if (avgPair > avg) {
      end--;
    } else if (avgPair === avg) {
      return true;
    }
  }
  return false;
};



console.log(averagePair([1, 2, 3], 2.5)); // true
console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); //true
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); //false
console.log(averagePair([], 4)); //false




/**
 이전의 풀이에서 toFixed(2)를 통해 소수점 둘째 자리까지 고정 후 비교하려 했지만
 변환 과정에서 값의 오차가 발생, 문제에서 반올림 후 비교에 관한 조건이 없음으로 위와 같이 toFixed를 쓰지 않으니
 정상적으로 작동 및 통과 완료!

 추가) toFixed는 string 값을 리턴한다
 */