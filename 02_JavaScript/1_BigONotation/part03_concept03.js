/**
 * [Big o notation]
 * - 대략적 수를 카운팅하는 것
 * - 입력된 내용이 증가함에 따른 알고리즘 실행시간 변화를 설명하는 방식
     (입력 크기 - 실행시간의 관계)
 * - 전반적인 것에 대해 

    f(n) = n   linear(선형)  -> O(n)
    f(n) = n²  quadratic(이차)   ->  O(n²)
    f(n) = 1   constant(상수 n이 커져도 영향 x)  ->  O(1)
    entirely different(전혀 다른 값)
 */

/*
  Number of operation is bounded by a multiple of n,
  실제로 1n이든 5n이든 상관 x

  => O(n)
 */
const addUpTo01 = (number) => {
  let result = 0;
  for (let i = 0; i <= number; i++) {
    result += i;
  }
  return result;
};

const countUpAndDown = (number) => {
  console.log('up ⬆️⬆');
  for (let i = 1; i < number; i++) {
    console.log(i);
  } // O(n)
  console.log('down ⬇️⬇️');
  for (let k = number - 1; k >= 1; k--) {
    console.log(k);
  } // O(n)
}; // 전반적인 것만 확인하므로 => O(n)

/* Always 3 operation , n이 증가해도 operation 갯수에 영향 x :
   => O(1)
*/
const addUpTo02 = (number) => (number * (number + 1)) / 2;

/*
 * O(n) operation inside of an O(n) operation  => O(n * n)
 * O(n)안에 O(n)이 있으면  => O(n²)
 */
const printAllPairs = (number) => {
  for (let i = 0; i < number; i++) {
    for (let k = 0; k < number; k++) {
      console.log(i, k);
    } //O(n)
  } //O(n)
};

/**
 * [Big o notation]
 1) Arithmetic operations are constant - 산수는 상수 (덧셈,뺄셈,곱셈,나눗셈 포함)
 2) Variable assignment is constant - 변수 할당도 상수
 3) Accessing elements in an array(by index) or object (by key) is constant
 4) In a loop, the complexity is the length of the loop times the complexity of whatever happens inside of the loop.
  ( 중첩 루프의 경우 n제곱 )
  */

// ex01 => n이 커질수록 커지기에 => O(n)
const printAtLeast5 = (number) => {
  for (let i = 0; i < Math.max(5, number); i++) {
    console.log(i);
  }
};

// ex02 => 5이후부터는 constant 하기 때문에 n이 커질수록 일정해짐 => O(1)
const printAtMost5 = (number) => {
  for (let i = 0; i < Math.min(5, number); i++) {
    console.log(i);
  }
};
