# HTTP 정리

## 1. HTTP란?

HTTP(HyperText Transfer Protocol)는 웹에서 클라이언트와 서버 간 데이터를 주고받기 위한 프로토콜이다. 주로 HTML 문서, 이미지, 동영상 등의 리소스를 전달하는 데 사용된다. 하지만 단순한 웹 페이지뿐만 아니라 JSON, XML, 텍스트 파일, 바이너리 데이터 등 거의 모든 형태의 데이터를 전송할 수 있다.

### 특징:

- **클라이언트-서버 구조(Client-Server Architecture)**: HTTP는 클라이언트(예: 웹 브라우저)와 서버 간의 요청 및 응답을 기반으로 동작하는 구조이다.
- **비연결(Connectionless)**: 요청을 보내고 응답을 받으면 연결을 종료한다.
- **무상태(Stateless)**: 각 요청은 독립적이며, 이전 요청과의 상태를 유지하지 않는다.
- **TCP/IP 기반**: 일반적으로 TCP를 사용하며, HTTP/3에서는 UDP 기반의 QUIC 프로토콜을 활용한다.
- **다양한 데이터 형식 지원**: JSON, XML, HTML, 이미지, 동영상, 바이너리 데이터 등 모든 형태의 데이터 전송 가능.
- **단순함(Simple) 및 확장 가능성(Scalability)**: HTTP는 설계가 단순하여 다양한 애플리케이션에서 쉽게 구현 가능하며, REST API 등과 결합하여 높은 확장성을 제공한다.

---

## 2. HTTP의 역사

| 버전     | 연도 | 특징                                                                                                                                  |
| -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP/0.9 | 1991 | 단순한 GET 요청만 지원                                                                                                                |
| HTTP/1.0 | 1996 | 요청/응답 헤더 도입, 상태 코드 추가 (TCP 기반)                                                                                        |
| HTTP/1.1 | 1997 | 지속적 연결(Persistent Connection) 지원 (RFC2068 (1997) -> RFC2616 (1999) -> RFC7230~7235 (2014)) - 현재 가장 많이 사용되는 HTTP 버전 |
| HTTP/2.0 | 2015 | 성능 개선, 다중화(Multiplexing), 헤더 압축 도입, 요청 및 응답 병렬 처리 (TCP 기반)                                                    |
| HTTP/3.0 | 2022 | 성능 개선 극대화, QUIC 프로토콜 기반, UDP 활용 (UDP 기반)                                                                             |

---

## 3. HTTP의 통신 구조

```plaintext
클라이언트 (브라우저)  →  HTTP 요청  →  서버 (웹 서버)
클라이언트 (브라우저)  ←  HTTP 응답  ←  서버 (웹 서버)
```

---

## 4. HTTP의 무상태성 - Stateless

### 4.1 상태 유지 (Stateful)

- 서버가 클라이언트의 이전 요청 상태를 저장하고 관리하는 방식.
- 항상 같은 서버가 요청을 처리해야 하므로 로드 밸런싱이 어렵고 특정 서버가 과부하될 가능성이 있음.
- 클라이언트는 필요한 요청 정보를 저장하지 않으며, 모든 상태 정보는 서버가 관리해야 함.

### 4.2 무상태 (Stateless)

- 서버가 클라이언트의 이전 요청 정보를 저장하지 않는 방식.
- 클라이언트가 요청 시 필요한 모든 정보를 포함하여 보내야 함.
- 요청을 처리하는 서버가 고정되지 않으므로 여러 서버를 증설하여 부하를 쉽게 분산할 수 있음.

### 4.3 Stateful vs Stateless 비교표

| 구분      | Stateful                                                           | Stateless                                                           |
| --------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| 상태 유지 | 서버가 세션 정보를 저장하며, 항상 같은 서버에서 요청을 처리해야 함 | 요청마다 독립적으로 처리되며, 여러 서버에서 부하 분산 가능          |
| 확장성    | 서버가 세션을 관리해야 하므로 확장에 제약이 있음                   | **스케일 아웃(Scale-out)**, 즉 수평 확장(Horizontal Scaling)에 유리 |
| 장점      | 연속적인 사용자 경험 제공                                          | 서버 부하가 적고 장애 대응이 용이                                   |
| 단점      | 서버 부하 증가, 특정 서버 장애 시 문제 발생                        | 클라이언트가 매번 인증해야 함                                       |

---

## 5. HTTP의 비연결성 - Connectionless

### 5.1 연결을 유지하는 모델

- 연결을 유지하면, 서버와 클라이언트의 연결은 서로의 네트워크 요청이 없더라도 계속해서 유지됨.
- 서버 자원이 지속적으로 사용되므로, HTTP는 기본적으로 연결을 유지하지 않는 모델을 채택함.

### 5.2 연결을 유지하지 않는 모델

- 연결을 유지하지 않으면, 서버의 자원을 효율적으로 사용할 수 있음.
- TCP 3-way handshake를 매번 수행해야 하므로 속도 저하 발생.
- **HTTP 지속 연결(Persistent Connections)** 및 **HTTP/2, HTTP/3의 최적화**로 해결됨.

### 5.3 비연결성 한계 - 단기 커넥션

- 초기 HTTP에서는 요청마다 TCP 연결을 맺어야 했으며, 성능 저하가 심각했음.

### 5.4 비연결성 극복 - HTTP 지속 연결

- HTTP/1.1부터 **지속 연결(Persistent Connection)**을 지원.
- **HTTP/2.0:** 다중화(Multiplexing), 헤더 압축, 서버 푸시 도입.
- **HTTP/3.0:** QUIC 프로토콜 사용, UDP 기반, 0-RTT 핸드셰이크 도입.

---

## 6. HTTP 메시지

### 6.1 HTTP 요청 메시지

#### **📌 HTTP 요청 메시지 구조**

```plaintext
METHOD 요청 URI HTTP/버전
헤더(Header)
빈 줄
바디(Body) (필요한 경우)
```

**예제 (GET 요청)**

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

**예제 (POST 요청)**

```
POST /login HTTP/1.1
Host: www.example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 29

username=user&password=1234
```

| 구성 요소                   | 설명                                                                   |
| --------------------------- | ---------------------------------------------------------------------- |
| **요청 라인(Request Line)** | HTTP 메서드(GET, POST 등), 요청 URI, HTTP 버전 포함                    |
| **헤더(Header)**            | 요청 관련 부가 정보 포함 (예: `Host`, `User-Agent`, `Content-Type` 등) |
| **빈 줄**                   | 헤더와 본문(Body) 사이 구분 역할                                       |
| **본문(Body)**              | POST, PUT 요청에서 데이터 포함 (GET 요청에서는 생략)                   |

### 6.2 HTTP 응답 메시지

#### **📌 HTTP 응답 메시지 구조**

```plaintext
HTTP/버전 상태 코드 상태 메시지
헤더(Header)
빈 줄
바디(Body)
```

**예제 (성공 응답)**

```
HTTP/1.1 200 OK
Date: Mon, 13 Mar 2025 12:00:00 GMT
Content-Type: text/html
Content-Length: 1256

<html>
  <head><title>Example</title></head>
  <body><h1>Welcome to Example</h1></body>
</html>
```

| 구성 요소                  | 설명                                                               |
| -------------------------- | ------------------------------------------------------------------ |
| **상태 라인(Status Line)** | HTTP 버전, 상태 코드(200, 404), 상태 메시지 포함                   |
| **헤더(Header)**           | 응답 관련 부가 정보 포함 (예: `Content-Type`, `Date`, `Server` 등) |
| **빈 줄**                  | 헤더와 본문(Body) 사이 구분                                        |
| **본문(Body)**             | HTML, JSON, 이미지 등 서버가 반환하는 데이터                       |

### 6.2 HTTP 응답 메시지

#### **📌 HTTP 응답 메시지 구조**

```plaintext
HTTP/버전 상태 코드 상태 메시지
헤더(Header)
빈 줄
바디(Body)
```

**📌 상태 라인(Status Line)**

- HTTP 응답 메시지는 **Start-Line**(상태 라인)으로 시작하며, 요청에 대한 응답 정보를 제공한다.
- 상태 라인의 문법은 다음과 같다:
  ```plaintext
  status-line = HTTP-version SP status-code SP reason-phrase CRLF
  ```
  - `HTTP-version`: 응답을 제공하는 서버의 HTTP 버전 (예: `HTTP/1.1`)
  - `status-code`: 요청 처리 결과를 나타내는 숫자 코드 (예: `200`, `404`, `500` 등)
  - `reason-phrase`: 상태 코드에 대한 설명 (예: `OK`, `Not Found`, `Internal Server Error` 등)

**예제 (성공 응답)**

```
HTTP/1.1 200 OK
Date: Mon, 13 Mar 2025 12:00:00 GMT
Content-Type: text/html
Content-Length: 1256

<html>
  <head><title>Example</title></head>
  <body><h1>Welcome to Example</h1></body>
</html>
```

**예제 (404 Not Found 응답)**

```
HTTP/1.1 404 Not Found
Date: Mon, 13 Mar 2025 12:00:00 GMT
Content-Type: text/html
Content-Length: 57

<html><body><h1>404 Not Found</h1></body></html>
```

| 구성 요소                  | 설명                                                                  |
| -------------------------- | --------------------------------------------------------------------- |
| **상태 라인(Status Line)** | Start-Line이라고도 불리며, HTTP 버전, 상태 코드, 상태 메시지로 구성됨 |
| **헤더(Header)**           | 응답 관련 부가 정보 포함 (예: `Content-Type`, `Date`, `Server` 등)    |
| **빈 줄**                  | 헤더와 본문(Body) 사이 구분 역할                                      |
| **본문(Body)**             | 서버가 반환하는 데이터 (예: HTML, JSON, 이미지 등)                    |

## 7. 참고 링크

> [HTTP 개요 및 백엔드 로드맵 - Inpa's Blog](https://inpa.tistory.com/entry/HTTP-%F0%9F%8C%90-%EB%B0%B1%EC%97%94%EB%93%9C-%EB%A1%9C%EB%93%9C%EB%A7%B5-HTTP%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C%EC%9A%94#http%EC%9D%98_%ED%86%B5%EC%8B%A0_%EA%B5%AC%EC%A1%B0)

> [MDN Web Docs - HTTP 개요](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)
