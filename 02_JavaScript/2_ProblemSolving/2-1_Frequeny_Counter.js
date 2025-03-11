/*
[Frequency counters]

> object 또는 set를 이용해서 다양한 값과 빈도를 수집
> 서로 비슷한 값으로 구성 되어 있는지, 
  서로 간의 애너그램(서로 같은 철자로 구성된건지),
  값이 다른 값이 포함되는지 여부,
  두 개 이상 또는 특정하게 발생하는 빈도 확인
> 배열과 문자열의 중첩 루프 또는 O(N^2) 연산을 대신할 수 있음
*/

/*
 (ex01) 
 두 배열을 받아 , 요소의 갯수가 같으면서 두번째 인자의 배열이 첫번째 인자의 배열의 제곱의 값을 갖고 있는 함수 same을 작성하시오.
 (단, 순서는 상관 없다)

 same([1,2,3],[4,1,9]); // true
 same([1,2,3],[1,9]); // false
 same([1,2,1],[4,4,1]); // false (must be sane frequency)

 */

const same = (arr1, arr2) => {
  // 배열의 크기가 같지 않으면 비교 할 필요 없이 return false
  if (arr1.length !== arr2.length) return false;
  // arr1 배열 순회
  for (const arr1Elem of arr1) {
    //arr1 요소의 인덱스
    const idx = arr2.indexOf(Math.pow(arr1Elem, 2));
    if (idx > -1) {
      // 인덱스가 있으면 arr2에서 제거해서 중복으로 확인 되는 것 방지
      arr2.splice(idx, 1);
    } else {
      //없으면 바로 false 리턴
      return false;
    }
  }
  return true; //모든 조건 만족하면 true
  //
};

const t1 = performance.now();
console.log(
  same(
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2,
      3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100,
    ],
    [
      1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 10000, 1, 4, 9, 16, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 10000, 25, 36, 49,
      64, 81, 100, 10000, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 10000,
    ]
  )
);
const t2 = performance.now();
console.log(`same 걸린 시간 : ${(t2 - t1) / 1000}s`); //same 걸린 시간 : 0.010898541000000008s

/*
 > 위의 해결책의 경우 하나의 for문을 사용한 것 같지만 그 자체가 loop인 indexOf를 사용
 > 시간복잡도 = O(N^2)의 복잡도를 가짐
*/

//(answer) frequency conter => 시간복잡도 = O(N)
//> 두 개의 중첩 루프보다 개별 루프가 낫다

const sameAnswer = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  // 중첩 for루프 없이 개별 배열의 빈도수를 count
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};
  for (const val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (const val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (const key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) return false; //제곱의 값이 두번째
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) return false;
  }

  return true;
};

const t3 = performance.now();
console.log(
  sameAnswer(
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2,
      3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100,
    ],
    [
      1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 10000, 1, 4, 9, 16, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 10000, 25, 36, 49,
      64, 81, 100, 10000, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 10000,
    ]
  )
);
const t4 = performance.now();
console.log(`sameAnswer 걸린 시간 : ${(t4 - t3) / 1000}s`); //sameAnswer 걸린 시간 : 0.000051708000000004974s

/*
  
 [Frequency Counter - 정리] 
  객체를 사용
    :객체를 사용하여 구성하는 것은 배열이나 문자열의 내용을 분석하는 방법으로 
    두 개의 배열을 객체로 세분화 하여 각 배열의 요소들 분류 후 각 배열을 비교 가능

 */

/*
(ex2): 두 개의 문자열을 받아 서로의 애너그램인지 확인 후 true/false 리턴하는 함수 validAnagram을 작성하시오

validAnagram('',''); // true
validAnagram('aaz','zza'); // false
validAnagram('anagram','nagaram'); //true
validAnagram('rat','car'); //false
validAnagram('awesome','awesom'); //false
validAnagram('qwerty','qeywrt'); //true
validAnagram('texttwisttime','timetwisttext'); //true

*/

// 내 풀이
const validAnagram = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  if (str1 === '' && str2 === '') return true;

  const str1Counter = {};
  const str2Counter = {};

  for (const char of str1) {
    str1Counter[char] = (str1Counter[char] || 0) + 1;
  }
  for (const char of str2) {
    str2Counter[char] = (str2Counter[char] || 0) + 1;
  }

  for (const char in str1Counter) {
    if (str1Counter[char] !== str2Counter[char]) {
      return false;
    }
  }
  return true;
};

console.log(validAnagram('', ''));
console.log(validAnagram('aaz', 'zza'));
console.log(validAnagram('anagram', 'nagaram'));
console.log(validAnagram('rat', 'car'));
console.log(validAnagram('awesome', 'awesom'));
console.log(validAnagram('qwerty', 'qeywrt'));
console.log(validAnagram('texttwisttime', 'timetwisttext'));

//refactor

const validAnagramRefact = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  if (str1 === '' && str2 === '') return true;
  const strCounter = {};
  for (const char of str1) {
    strCounter[char] ? (strCounter[char] += 1) : (strCounter[char] = 1);
  }
  for (const char of str2) {
    if (!strCounter[char]) {
      return false;
    } else {
      strCounter[char] -= 1;
    }
  }
  return true;
};

console.log('refactoring');
console.log(validAnagramRefact('', ''));
console.log(validAnagramRefact('aaz', 'zza'));
console.log(validAnagramRefact('aazaaaz', 'aaaazza'));
console.log(validAnagramRefact('anagram', 'nagaram'));
console.log(validAnagramRefact('rat', 'car'));
console.log(validAnagramRefact('awesome', 'awesom'));
console.log(validAnagramRefact('qwerty', 'qeywrt'));
console.log(validAnagramRefact('texttwisttime', 'timetwisttext'));
