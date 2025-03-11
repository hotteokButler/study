/*
 두 문자열을 받아 첫 번째 문자열의 문자가 두 번재 문자열의 문자의 일부에
 포함되는 지 확인하는 inSubsequence라는 함수를 작성, 
 첫 번째 문자열의 문자가 "순서가 바뀌지 않고" 두 번째 문자열의 어딘가에 나타나는 지 확인

 inSubsequence('hello','hello world'); // true
 inSubsequence('sing','sting');  true
 inSubsequence('abc','abracadabra'); // true
 inSubsequence('abc','acb'); // false (order matters)
*/

// 풀이전 대략적...
// 1.  첫번째 문자열의 길이가 두 번째 문자열의 길이보다 크거나, 값이 없으면 비교가 안되므로 false 리턴
// 2. 포인터 초기화  : 첫 번째 문자열 포인터, 두 번째 문자열 포인터 각각 첫번째 부터 시작 (순서대로 확인해야해서)
// 3. 첫 번째 포인터 값 !== 두 번째 포인터 값 => 두 번째 포인터++
//    첫 번째 포인터 값 === 두 번째 포인터 값 =>  둘 다 ++

//    두 번째 포인터 값이 두 번째 문자열의 마지막 인덱스 보다 크면 종료 후 false 리턴
//    첫 번째 포인터 값이 첫 번째 문자열의 마지막 인덱스 보다 크면 종료 후 true 리턴

const inSubsequence = (str1, str2) => {
  if (str1.length > str2.length) return false;

  let i = 0;

  for (let k = 0; k < str2.length; k++) {
    const str1Elem = str1[i];
    const str2Elem = str2[k];

    if (str1Elem === str2Elem) i++;

    if (i === str1.length) return true;
  }

  return false;
};
console.log(inSubsequence('hello', 'hello world')); // true
console.log(inSubsequence('sing', 'sting')); //true;
console.log(inSubsequence('abc', 'abracadabra')); // true
console.log(inSubsequence('abc', 'acb')); // false (order matters)


/**
 * 
 * 풀이 해답 로직은 거의 같지만 리팩토링 필요, 
 * 이미 true라면 문자열 끝까지 확인 할 필요 없으므로 return 값을 포문 안으로 이동
 */