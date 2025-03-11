/*
객체의 Big O

[Object] 
- 순서가 없다 오로지 key를 통해 접근 및 추가

1) Insertion(추가) - O(1)
2) Removal(삭제) - O(1)
3) Searching(검색) - O(N) 
  - 객체의 프로퍼티를 전부 순회해서 값을 확인해야 하기 때문에 linear time O(N)
4) Access(접근) - O(1)

[Object]를 언제 쓰는가?
1)정렬 필요 없을 때
2)빠른 접근 추가 삭제
*/

const exObject = {
  one : 1,
  two : 2,
  three : 3,
  isTrue : true,
  isFalse : false,
}

/*
[Object Method]
1) Object.keys - O(N)
2) Object.values - O(N)
3) Object.entries - O(N)
4) object.hasOwnProperty(key) , Object.hasOwn(object,key)- O(1)
*/

// Object의 크기가 커질 수록 method가 처리하는 연산이 커짐 O(N) 
console.log(Object.keys(exObject)); // key 배열 return [ 'one', 'two', 'three', 'isTrue', 'isFalse' ]

// Objects.valuse, Object.entires  또한  Object.keys와 마찬가지인 이유로 object의 요소가 늘어날수록 연산이 커짐 O(N)
console.log(Object.values(exObject)); // value 배열 return [ 1, 2, 3, true, false ]
console.log(Object.entries(exObject)); 
/* [key-value]쌍의 배열
[
  [ 'one', 1 ],
  [ 'two', 2 ],
  [ 'three', 3 ],
  [ 'isTrue', true ],
  [ 'isFalse', false ]
]
*/

//Object.hasOwnProperty(key) , Object.hasOwn(object,key)-> object의 내부 key값 존재 유무 정해진 값을 받아 boolean type으로 return => O(1)
console.log(exObject.hasOwnProperty('one'));//true
console.log(exObject.hasOwnProperty(1));//false (key기준)
console.log(Object.hasOwn(exObject,'two'));//true