/*
[Recursion - 재귀]

- 자기 자신을 호출하는 절차

-  재귀가 쓰이는 곳
  > JSON.parse / JSON.stringify
  > document.getElementById, querySelector and DOM 탐색 알고리즘
    (*DOM은 요소가 중첩된 트리 구조)
  > 객체 순회
  > 복잡한 데이터 구조 (데이터 구조, 트리, 그래프)를 순회, 그 안에 있는 요소 검색 하는 경우


[call stack] - 재귀와 밀접하게 관련된 개념
- JavaScript는 단일 스레드 프로그래밍 언어이므로, 단일 호출 스택이 존재. 
  =>한 번에 하나의 일(Task)만 처리할 수 있다
- 함수를 실행하면 해당 함수의 기록을 스택 맨 위에 추가(Push) ,
  함수를 결과 값을 반환(함수가 종료)하면 스택에 쌓여있던 함수는 제거(Pop) 

*/

/*
[Recursion Function]

- 동일한 함수를 계속 호출하면서 하나의 함수가 자신을 재귀적으로 호출
 (중단 포인트를 만날 때 까지 같은 함수를 계속 호출)
- 중단 조건은 마지막 라인에
- 매번 다른 input을 통해 호출

*/

//ex1
const countDown = (num) => {
  if (num <= 0) {
    console.log('끝!!!!!');
    return;
  }
  console.log(num);
  num--;
  countDown(num);
};

countDown(5);

//ex2 - 다른 재귀 형태
// num까지의 합을 리턴하는 함수 sumRange를 작성하시오

const sumRange = (num) => {
  if (num === 1) return 1; //base case (중단 조건)
  return num + sumRange(num - 1); // 재귀호출 : 매번 더 작은 값으로 input 값을 받음
};

console.log(sumRange(3));

/*
 실행순서 3 >> return 3 + sumRange(2)
 실행순서 2 >>            return 2 + sumRange(1)
 실행순서 1 >>                       return 1    
 call stack의 상단의 연산부터 시작해 sumRage(1)의 리턴값 (재귀 종료)인 1부터 순서대로  ((1) + 2)+ 3 순서대로 sum 후 리턴

    --call stack 상태 --
      [sumRange(1)]
      [sumRange(2)]
      [sumRange(3)]
  [anonymous (실행파일)]

*/


/*
 [재귀 함수의 잠재적 위험성] 
 */

 // 자주 발생하는 문제
 // 1. 종료 조건이 없거나 잘못 되는 경우 - 
//        함수가 종료되지 않고 stack overflow로 종료됨 (엔진마다 호출 스택 크기가 정해져 있기 때문에) 
//        return 으로 확실한 break point(base case)를 설정해줘야 한다. 
//  2. 값을 반환하는 걸 잊는 것
//       call stack의 경우 모든 항목이 서로에게 의존적이며 연결되어 있다 마지막에는 어떤 값을 도출해서 그 값을 돌려보내야 한다
//  3. 잘못된 값을 반환 하는 것