/**
 * 1 부터 number 까지의 합 구하기
 * @param {number} number
 * @returns
 */

const calculateOneToN = (number) => {
  let increase = 1;
  let result = 0;
  for (let i = 0; i < number; i++) {
    result += increase;
    increase++;
  }
  return result;
};

// answer
const calculateUpToNAswer01 = (number) => {
  let result = 0;
  for (let i = 0; i <= number; i++) {
    result += i;
  }
  return result;
};

const calculateUpToNAswer02 = (number) => (number * (number + 1)) / 2;

/*
 [단순 시간 비교의 문제점] - 나쁘다는 건 아님!
 - 성능과 실행중인 프로세스에 따라 다를 수 있음 (모든 OS, IDE, 플랫폼에서 동일한 결과가 나오지 않는다.)
 (차이가 달라질 수 있고 책정된 시간들이 달라 질 수 있음)
 - 크게 차이나지 않지만 같은 기계나 엔진에 따라 조금씩 차이가 있을 수 있어 측정이 정확하지 않음
 - 빠른 알고리즘에서는 짧은 시간 안에 모든 것이 처리 되어 속독 측정 정확도가 충분하지 않을 수 있음
 - 실행 시간 측정을 위한 또다른 방법이 필요하다

 테스트 시간이 각각 길거나 할 경우 더 효율적으로 값을 비교하는 Big o 표기법 유용
 => 컴퓨터가 처리해야하는 연산 갯수 확인
 */

const num = 10000000000;
const t1 = performance.now();
calculateOneToN(num);
const t2 = performance.now();
console.log(`calculateOneToN 걸린 시간 : ${(t2 - t1) / 1000}s`);
// calculateOneToN 걸린 시간 : 9.397132416999998s

const t3 = performance.now();
calculateUpToNAswer01(num);
const t4 = performance.now();
console.log(`calculateUpToNAswer01 걸린 시간 : ${(t4 - t3) / 1000}s`);
//calculateUpToNAswer01 걸린 시간 : 14.308797125000002s

const t5 = performance.now();
calculateUpToNAswer02(num);
const t6 = performance.now();
console.log(`calculateUpToNAswer02 걸린 시간 : ${(t6 - t5) / 1000}s`);
//calculateUpToNAswer02 걸린 시간 : 0.00006970900000305846s
