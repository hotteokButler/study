/*
 [Array] - Ordered lists(정렬 되어 있음)

 - 순서가 정해져 있기 때문에 연산에 시간이 더 걸릴 수 있다.
 - 배열에 있는 데이터를 접근하는 것은 빠름,
 - 정렬될 필요가 있는 데이터 및 정렬 되어 있는 데이터 보관 유리

1)Insertion(삽입) 
  - 맨 앞: O(N) => 요소들이 하나씩 뒤로 밀리며 index 재정렬 필요
  - 맨 뒤: O(1) 
2)Removal(삭제) 
  - 먠 앞, 중간 추가: O(N) => index 재정렬 필요
  - 맨 뒤: O(1)
3)Searching(검색) - O(N)
4)Access(접근) - O(1)

[Array Method]

1) push , pop - O(1)
  :index를 이용하여 접근하는 것과 동일, constant time, 빠름
2) shift - O(N)
  - reindex 필요
3) unshift - O(N)
  - reindex 필요
4) concat - O(N) 
  - 병합 할 배열의 크기가 커질 수록 오래 걸림
5) slice - O(N)
  - 배열 전체 또는 일부를 copy하지만 copy할 배열의 길이에 따라 다름
6) splice - O(N)
  - elem 제거 및 추가-O(N)
7) sort O(N logN)
9) forEach(),map(),filter(),reduce() 등등 - O(N)

 */