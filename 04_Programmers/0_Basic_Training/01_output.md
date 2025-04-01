## 🛠️ 1. 프로그래머스 Javascript 초기화 코드 설명

좋아! 이 코드는 **Node.js** 환경에서 사용자로부터 **표준 입력(콘솔)**을 받아 처리하기 위한 기본 템플릿 코드야. 보통 **프로그래머스**에서 `Node.js`로 문제를 풀 때 초기 입력을 받을 수 있게 제공되는 구조 중 하나지. 하나씩 설명해줄게:

### 1-1. `readline` 모듈 불러오기

```javascript
const readline = require('readline');
```

- `readline`은 Node.js에서 콘솔 입력을 읽을 수 있도록 도와주는 내장 모듈이야.

### 1-2. 입력 인터페이스 생성

```javascript
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
```

- `readline.createInterface()`를 통해 입력을 받을 수 있는 인터페이스를 만들어.
- `input: process.stdin`: 사용자의 입력을 표준 입력(콘솔)에서 받겠다는 의미.
- `output: process.stdout`: 표준 출력으로 결과를 출력할 수도 있게 해줌 (보통 생략해도 됨).

### 1-3. 입력 받을 변수 초기화

```javascript
let input = [];
```

- 사용자로부터 받은 입력을 저장할 배열이야.

### 1-4. 입력 이벤트 처리

```javascript
rl.on('line', function (line) {
	input = line.split(' ');
}).on('close', function () {
	str1 = input[0];
	str2 = input[1];
});
```

#### `rl.on('line', ...)`

- 한 줄씩 입력받을 때마다 호출돼.
- 예를 들어, 사용자가 `"hello world"` 라고 입력하면,
  ```javascript
  input = ['hello', 'world'];
  ```

#### `rl.on('close', ...)`

- 입력이 끝났을 때 (예: Ctrl + D or 입력 스트림 종료) 호출돼.
- 이 안에서 실제 로직을 수행하면 돼.
- 위 코드는 입력받은 단어를 각각 `str1`, `str2`에 저장하고 있어.

### 1-4. 예시 입력/출력 흐름

입력:

```
apple banana
```

처리 결과:

```javascript
input = ['apple', 'banana'];
str1 = 'apple';
str2 = 'banana';
```

필요하다면, 이 구조에 추가 로직을 넣어서 문제 풀이를 진행할 수 있다. 예를 들어:

```javascript
console.log(str1 + ' & ' + str2); // 출력: apple & banana
```

---

## 🤔 2. 문제 풀이

### 💬2-1. 문자열 붙여 출력하기 [2025.03.28]

> 두 개의 문자열 str1, str2가 공백으로 구분되어 입력으로 주어집니다.
> 입출력 예와 같이 str1과 str2을 이어서 출력하는 코드를 작성

#### 💡 내 풀이 - 통과✅

```javascript
const readline = require('readline');

readline
	.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
	.on('line', function (line) {
		console.log(line.split(' ').join(''));
	});
```

- 기본 초기화 코드 간결하게 리팩토링 후 사용
  - `'line'` : 한 줄씩 입력받을 때마다 호출 되므로 굳이 입력 끝날 때 입력 필요 없어 삭제
- `join(separator)`
- 배열의 모든 요소를 쉼표나 지정된 구분 문자열로 구분하여 연결한 새 문자열 반환
- `separator` : 배열의 인접한 요소의 각 쌍을 구분하는 문자열입니다. 생략되면 배열 요소는 쉼표(",")로 구분

### 💬2-2. 문자열 붙여 출력하기 [2025.04.01]

> 문자열 my_string, overwrite_string과 정수 s가 주어집니다. 문자열 my_string의 인덱스 s부터 overwrite_string의 길이만큼을 문자열 overwrite_string으로 바꾼 문자열을 return 하는 solution 함수를 작성해 주세요.

#### 💡 내 풀이 - 통과✅

```javascript
function solution(my_string, overwrite_string, s) {
	return my_string.slice(0, s) + overwrite_string + my_string.slice(s + overwrite_string.length);
}
```

- slice()로 문자열을 앞, 중간, 뒤로 나눈 후 연결.
- 문자열은 불변(immutable)이기 때문에 새로운 문자열을 만들어 반환.
- 간결하고 직관적.

- ✔ 장점

  - 빠르고 메모리 효율적입니다.
  - 내부적으로는 문자열의 일부분을 잘라내고 이어 붙이는 연산이지만, 최적화가 잘 되어 있습니다.
  - 추가 라이브러리나 배열 변환 없이 순수 문자열 연산만 사용합.

- ✔ 단점
  - 너무 긴 문자열을 자주 조작하는 경우, 문자열 연결 비용이 누적될 수 있습니다. (하지만 이 문제에선 무시해도 될 수준)

#### 💡 다른 풀이 - (split() + splice())✅

```javascript
function solution(my_string, overwrite_string, s) {
	const answer = my_string.split('');
	answer.splice(s, overwrite_string.length, ...overwrite_string);
	return answer.join('');
}
```

| 항목        | 내 풀이 (slice + concat) | 배열 기반 풀이 (split + splice + join) |
| ----------- | ------------------------ | -------------------------------------- |
| 간결함      | ✅ 매우 간단             | ❌ 더 복잡                             |
| 성능        | ✅ 더 빠름               | ❌ 상대적으로 느림                     |
| 메모리 효율 | ✅ 불필요한 배열 없음    | ❌ 배열 생성 및 조작                   |
| 직관성      | ✅ 높은 편               | ❌ 배열을 알아야 이해 가능             |
| 버그 가능성 | ✅ 없음                  | ❌ spread 연산 누락 시 오류 발생       |
