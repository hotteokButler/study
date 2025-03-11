/*
[Helper Method Recursion]

재귀적이지 않은 외부 함수가 재귀적인 내부 함수(inner function)을 호출하는 패턴이다. 문제 해결을 위한 하나의 접근법이다. 

- 헬퍼 함수 혹은 헬퍼 메소드 재귀라고 부른다. 
- 메인 외부 함수를 개발자가 외부에서 호출한다. 
- 이 외부 함수를  호출할 때 인자를 내부로 전달해 줄 수 있다. 
- 이 외부 함수 내부에는 또 다른 내부 함수가 정의되어 있다. 내부함수는 호출되고 재귀적으로 자기자신을 호출한다. 
- 결과를 컴파일할 때 흔히 사용 결과는 배열과 다른 형태의 데이터 구조
 */

// 기본 helper method recursion pattern
const outer = (input) => {
  const outerScopedVar = []; // array or list of data

  const helper = (helperInput) => {
    //outerScopedVar 변경
    helper(helperInput--); // 인풋 값 감소
  };

  helper(input);

  return outerScopedVar;
};

//사용 예
// ex) 어느 배열에서 홀수 값을 구하는 것 같은 작업

const collectOddValues = (arr) => {
  const result = [];

  const helper = (helperInput) => {
    if (helperInput.length === 0) return;

    if (helperInput[0] % 2 !== 0) result.push(helperInput[0]);

    helper(helperInput.slice(1));
  };

  helper(arr);

  return result;
};

console.log(collectOddValues([1, 4, 6, 2, 3, 4, 5, 7])); //

/* 

재귀 함수를 내부 호출히서 쓰는 위의 패턴이 아닌 재귀만 사용해서 풀이

*/

const collectOddValues2 = (arr) => {
  let newArr = []; // 내부에 요소를 추가해주는 게 아닌 배열을 합쳐서 새 배열을 할당해야 하므로 let으로 선언

  if (arr.length === 0) return newArr;

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }
  console.log(newArr);
  newArr = newArr.concat(collectOddValues2(arr.slice(1)));

  return newArr;
};
console.log(collectOddValues2([1, 2, 3, 4, 5])); 

/*
collectOddValues2([1,2,3,4,5]) 재귀 동작 방식

[1].concat(collectOddValues2([2,3,4,5]))
            [].concat(collectOddValues2([3,4,5]))
                        [3].concat(collectOddValues2([4,5]))
                                    [].concat(collectOddValues2([5]))
                                                [5].concat(collectOddValues2([])) 
                                                              []

 */


/*
[순수하게 재귀만을 사용해서 구성할 경우]

자료형에 맞게 복사본을 만들어 진행 => 변경 할 필요 없음 , 결과를 축적할 수 있음

1. array : array.slice(), spread operator , array.concat()와 같은 배열을 복사하는 메서드를 사용

2. String : immutable(변경할 수 없음)하기에 slice, substr, substring 같은 메서드를 통해 문자열의 사본을 만들어 진행

3. Object :  Object.assign , spread operator를 이용해 복사본 만들어 사용

*/
