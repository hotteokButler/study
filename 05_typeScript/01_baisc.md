# Typescript에 대해서

- 타입스크립트 = 자바스크립트의 확장판
  - 자바스크립트를 더 안전하게 사용할 수 있도록 **타입 관련 기능들을 추가한** 언어
- 점진적 타입 시스템(Gradual Type System) -> 모든 변수에 타입을 일일이 지정할 필요 없음

## 1. TypeScript는 어떤 불편함을 해결하기 위해 만들어졌나?

**✅ JavaScript의 한계**

- JavaScript는 동적 타이핑 언어로, 변수나 함수의 타입이 런타임까지 보장되지 않음 (엄격한 언어가 아님).
- 이 때문에 **규모가 커질수록 버그 예측 불가 → 유지 보수 비용 증가** 문제가 발생했음 .
- 예를 들어, 문자열 변수에 함수 호출을 시도하면 JS는 런타임 `TypeError`를 내지만, 사전 예측은 불가능함 .

**✅ TypeScript 도입 배경**

- 마이크로소프트는 **대규모 애플리케이션 개발에서 JavaScript의 한계를 극복할 필요**를 느껴,
  ECMAScript 신기능(예: 클래스 등) + **선택적 정적 타이핑**을 제공하는 언어를 고안했고 → TypeScript가 탄생 (안정적으로 JS를 사용하기 위해)
- TS는 JS의 최상위 집합으로, 기존 JS 코드도 **무리 없이 TS 프로젝트에 포함 가능** .
- 따라서 **자동 완성, 코드 네비게이션, 타입 검증** 기능이 강화되어 개발 생산성을 높이며, 런타임 버그를 사전에 차단할 수 있게 됨 .

## 2. TypeScript의 동작 원리

### 2-1. 컴파일러 구조

TypeScript 컴파일러(`tsc`)는 세 단계로 동작

> `코드` ➡️ `AST(추상 문법 트리)` ➡️ `타입검사(Type Checking)` ➡️ `JS 코드로 변환` ➡️ `컴파일 종료 이후 대다수 언어들과 동일한 컴파일 과정(JS -> AST -> bite 코드)` ➡️ `실행`

- 타입과 관련된 코드들은 컴파일 결과에서 모두 사라진다. <br/>
- `AST`(추상 문법 트리) : 프로그램 코드를 트리 구조로 표현한 데이터 구조입니다. 코드의 의미와 구조(receiver)를 계층적으로 표현 <br/>

<details>
  <summary><b>컴파일러 구조 더 자세히 알아보기</b></summary>

TypeScript 컴파일러(tsc)는 세 단계로 동작

1. Scanner (토크나이저): 소스 코드 스트림을 토큰으로 분해

2. Parser: 토큰을 기반으로 AST(추상 구문 트리) 생성

3. Checker & Emitter:

- Checker는 AST 위에서 타입 규칙 검사를 수행 (정적 타입 검증)
- Emitter는 타입 정보를 제거하고 순수 JavaScript 코드로 트랜스파일
</details>

### 2-2. 타입 시스템 + 타입 추론

- 사용자가 타입을 **명시적으로 적지 않아도**, TS는 코드 컨텍스트를 기반으로 타입을 자동 추론함 .
- 명시적으로 타입을 지정할 수 있는 다양한 방법도 제공: 인터페이스, 제네릭, 유틸리티 타입 등 .

### 2-3. JavaScript와의 호환성

- TS는 ES5 이상 표준을 지원하며, **하위 호환성을 보장하되 최신 JS 기능을 TS에 녹임**
- `.d.ts` 선언 파일을 통해 기존 JS 모듈(예: Node.js, jQuery 등)에 **타입 정보를 붙여 사용 가능**

### 2-4. TypeScript VS JavaScript

| 항목                  | TypeScript                                                             | JavaScript                                               |
| --------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| **정적 vs 동적 타입** | 선택적 정적 타이핑 지원 (컴파일 타임에 타입 검사)                      | 동적 타이핑, 런타임까지 타입 보장 없음                   |
| **타입 시스템**       | 인터페이스, 제네릭, 열거형, 유니온/인터섹션 등 강력한 타입 시스템 제공 | 타입 시스템 없음                                         |
| **코드 안정성**       | 컴파일 단계에서 오류 탐지 가능 → 유지보수성과 안정성 향상              | 런타임에 에러 발생 가능성 높음                           |
| **개발 도구 지원**    | VSCode 등의 IDE에서 자동완성, 인텔리센스, 리팩토링 도구 풍부           | ESlint 등 도구 사용 가능하지만, 타입 기반 도구는 제한적  |
| **트랜스파일 과정**   | `tsc`로 TypeScript → JavaScript로 변환 (`.ts`, `.tsx` 확장자 사용)     | 별도 컴파일 불필요, 브라우저나 런타임에서 바로 실행 가능 |
| **ECMAScript 호환성** | ES6+ 기능에 타입 시스템 결합 (클래스, 모듈, async/await 등)            | ES 버전마다 스펙 구현, ECMAScript 표준 따름              |
| **런타임 성능**       | 타입 정보 제거 후 JS로 실행—런타임 성능 변화 없음                      | 인터프리터 방식, 브라우저 엔진 최적화 적용               |

### 2-5. ⚙️ 다른 언어 대비 주요 차별점 비교

| 항목                                             | **TypeScript**                                                          | **다른 언어 (Java, C#, Rust 등)**                                    |
| ------------------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **정적 타이핑 vs 구조적 타이핑**                 | 구조적(subtyping by structure) 타입 시스템 지원 → 유연함                | 대부분 명목적(nominal) 타입 시스템 사용                              |
| **Union / Intersection 타입**                    | `A \| B`, `A & B` 같은 복합 타입 표현 가능                              | Java/C#에서 구현 어려움, Rust의 열거형과 유사하지만 제한적           |
| **런타임 타입 제거 (Type Erasure)**              | 타입은 컴파일 타임에만 존재하며, 트랜스파일 후 JS에는 남지 않음         | 대부분의 언어도 컴파일 후 타입은 런타임에 남지만 TS는 JS와 완벽 호환 |
| **점진적 채택 가능 & JS 호환성**                 | `.js` → `.ts` 확장자만 변경해도 점진적 적용 가능                        | 새 언어 도입 시 전체 코드베이스 수정 필요                            |
| **최신 ECMAScript 지원 + 하위호환 트랜스파일링** | 최신 JS 기능 사용 가능, `tsc`나 Babel로 ES5/ES6 등으로 트랜스파일       | Java/C# 등은 브라우저 환경 타겟 아님, Node/Bundler 필요              |
| **강력한 타입 추론 + 선택적 타입 지정**          | 타입 선언 생략 시에도 추론으로 유연함 유지                              | Java/C#은 대부분 명시 타입 선언 요구                                 |
| **도구 통합**                                    | VSCode 등과 깊은 IDE 통합으로 자동완성, 리팩토링 등에 강력함            | 다른 언어도 IDE 지원되나, JS 생태계와 TS의 도구 연동성이 우수        |
| **유니버설 생태계**                              | JavaScript 코드·라이브러리와 완전 호환 → 범용성 높음                    | 전용 생태계 기반 언어들은 JS 코드 활용 어려움                        |
| **타입 시스템이 JS 위에서 추가됨**               | JavaScript 위에 타입을 얹는 방식으로 “JS를 확장” → 자연스러운 진입 경로 | 완전히 새로운 언어는 다른 문법과 런타임 필요                         |

- 타입 시스템 : 값들을 어떤 기준으로 묶어 타입을 정할지 결정하고, 언제 검사할지, 프로그래밍 언어를 사용할 때 타입과 관련해서 지켜야하는 규칙규칙들을 모아둔 체계
  - a. 정적 타입 시스템 : 코드 실행 전 모든 변수의 타입을 고정적으로 결정 - 엄격하고 고정적인 시스템 (ex: C, JAVA)
  - b. 동적 타입 시스템 : 코드를 실행하고 나서 그때마다 유동적으로 변수의 타입을 결정 - 자유롭고 유연한 시스템 (ex : Python, JS)

### 인용

> - [한 입 크기로 잘라먹는 타입스크립트(TypeScript) | 이정환](https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)
> - [https://dev.to/dvorlandi/implementing-clean-architecture-with-typescript-3jpc](https://dev.to/dvorlandi/implementing-clean-architecture-with-typescript-3jpc)
> - [https://www.tutorialspoint.com/how-typescript-works-internally](https://www.tutorialspoint.com/how-typescript-works-internally)
> - [https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
> - [https://en.wikipedia.org/wiki/TypeScript](https://en.wikipedia.org/wiki/TypeScript)
> - [https://www.sanity.io/typescript-guide/typescript-vs-javascript](https://www.sanity.io/typescript-guide/typescript-vs-javascript)
> - [TypeScript vs. JavaScript: Explaining the differences - Contentful](https://www.contentful.com/blog/typescript-vs-javascript-explaining-the-differences/)
