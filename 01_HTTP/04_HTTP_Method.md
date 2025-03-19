# HTTP 메서드

## 1. HTTP Method 종류

HTTP 메서드는 클라이언트와 서버 간의 통신에서 특정한 작업을 수행하기 위한 요청 방식이다. 주요 HTTP 메서드는 다음과 같다.

| 메서드 | 설명                                                                                                                                                                                                                                          |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | 리소스를 조회할 때 사용 (Read)하며, 데이터를 변경하지 않음. 요청 데이터는 주로 URL의 쿼리 스트링을 통해 전달됨. 서버에 의해 캐싱될 수 있음. 메시지 바디 사용은 가능하지만 일반적으로 권장되지 않음 (일관되지 않은 지원, 캐싱 문제 발생 가능). |
| POST   | 리소스를 생성하거나 데이터를 제출할 때 사용                                                                                                                                                                                                   |
| PUT    | 리소스를 전체적으로 수정하거나 새로운 리소스를 생성할 때 사용 (리소스가 없으면 새로 생성)                                                                                                                                                     |
| PATCH  | 리소스의 일부만 수정할 때 사용 (PUT과 달리 전체가 아닌 특정 필드만 변경 가능)                                                                                                                                                                 |
| DELETE | 리소스를 삭제할 때 사용                                                                                                                                                                                                                       |
| HEAD   | 리소스의 메타데이터만 요청할 때 사용                                                                                                                                                                                                          |

---

## 2. HTTP 메서드 - GET

GET 메서드는 리소스를 조회하는 용도로 사용되며, 클라이언트가 서버에서 데이터를 요청할 때 사용된다.

- **리소스 조회 메서드 (Read)이며, 서버의 상태를 변경하지 않는다.**
- **전달하는 데이터는 주로 쿼리 스트링을 이용하여 URL에 포함된다.**
- **메시지 바디를 이용해 데이터를 전달할 수도 있지만, 표준화되지 않아 권장되지 않는다.**
- **캐싱이 가능하므로 동일한 요청을 반복할 경우 성능을 향상시킬 수 있다.**

### 2.1. 정적 데이터 조회 과정

GET 요청은 변하지 않는 정적 데이터를 조회할 때 사용된다.

- **쿼리 파라미터 없이 단순 리소스 경로를 통해 데이터를 조회할 수 있다.**

#### **클라이언트-서버 간 GET 요청 조회 과정**

**상황**: 클라이언트가 `GET /members/100`을 요청하여 100번 멤버의 정보를 조회한다고 가정

1. 클라이언트는 `/members/100` 경로로 GET 요청을 보냄
2. 서버는 해당 ID(100)에 해당하는 데이터를 조회함
3. 서버는 응답으로 해당 리소스를 반환함
4. 클라이언트는 반환된 데이터를 화면에 표시함

```http
GET /members/100 HTTP/1.1
Host: example.com
```

### 2.2. 동적 데이터 조회 과정

동적 데이터는 검색어나 특정 조건에 따라 변하는 데이터이다.

- **주로 검색, 게시판 목록 조회 등에 사용된다.**
- **쿼리 파라미터를 사용하여 데이터를 전달한다.**

#### **쿼리 파라미터 구조 예시**

```http
GET /search?q=hello&hl=ko HTTP/1.1
Host: example.com
```

- `q=hello`: 검색어
- `hl=ko`: 언어 설정 (한국어)

#### **클라이언트-서버 간 요청 조회 과정**

**상황**: 사용자가 `?q=hello&hl=ko`라는 쿼리 파라미터를 추가하여 검색 요청을 수행한다고 가정

1. 클라이언트는 `/search?q=hello&hl=ko` URL로 GET 요청을 보냄
2. 서버는 검색어(`q=hello`)와 언어(`hl=ko`)에 맞는 데이터를 검색함
3. 서버는 결과 데이터를 JSON 또는 HTML로 응답함
4. 클라이언트는 검색 결과를 화면에 출력함

### 2.3. HTML Form 데이터 조회 과정

HTML `<form>` 태그는 사용자가 입력한 데이터를 서버로 전송하는 데 사용되며, GET 방식으로 데이터를 전송할 수 있다.

- **HTML Form 태그는 사용자와 UI로 상호작용하여 데이터를 서버로 전송하는 역할을 한다.**
- **HTML Form 전송 방식 중 GET과 POST만 지원된다.**
- **GET 방식으로 전송하면 입력한 데이터가 URL의 쿼리 스트링에 포함된다.**

```html
<form action="/search" method="GET">
	<input type="text" name="q" placeholder="검색어" />
	<button type="submit">검색</button>
</form>
```

요청 예시:

```http
GET /search?q=HTTP HTTP/1.1
Host: example.com
```

---

## 3. HTTP 메서드 - POST

POST 메서드는 **서버에 데이터를 전달하여 새로운 리소스를 생성하거나 프로세스를 처리하는 데 사용된다.**

- **전달한 데이터 처리/생성 요청 메서드(Create) 역할을 한다.**
- **메시지 바디(body)를 통해 데이터를 서버로 전송하면, 서버는 이를 처리하여 리소스를 생성하거나 업데이트한다.**
- **신규 리소스 등록, 데이터 변경 요청, 프로세스 실행(예: 결제 처리, 이메일 전송)에 사용된다.**
- **GET 메서드로 데이터를 조회하는 것이 애매한 경우, JSON 데이터를 포함한 POST 요청을 활용할 수 있다.**

### 3.1. JSON 데이터 전송 과정

클라이언트가 **JSON 데이터를 서버로 전송**할 때 사용되며, REST API에서 가장 일반적으로 활용된다.

#### **📌 POST 요청 예시**

```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### **📌 처리 과정**

1. 클라이언트가 JSON 데이터를 포함한 POST 요청을 서버로 보냄
2. 서버가 요청을 수신하고 JSON 데이터를 파싱하여 처리
3. 새로운 사용자를 생성한 후, 응답을 반환

#### **📌 POST 응답 메시지 예시**

```http
HTTP/1.1 201 Created
Location: /api/users/123
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}
```

- **201 Created**: 새 리소스가 성공적으로 생성됨
- **Location 헤더**: 생성된 리소스의 URL을 나타냄

### 3.2. HTML Form 데이터 전송 과정

HTML `<form>`을 사용하여 **사용자가 UI를 통해 입력한 데이터를 서버로 전송**할 때 사용된다.

#### **📌 HTML Form의 역할**

- **사용자와 UI가 상호작용하여 데이터를 입력하고 서버와 통신**
- **회원가입, 상품 주문, 데이터 변경 등의 요청을 처리하는 데 사용**
- **HTML Form은 GET과 POST 메서드만 지원**  
  (파일 업로드 같은 경우 POST만 사용 가능)

#### **📌 HTML Form 예시**

```html
<form action="/register" method="POST">
	<input type="text" name="username" placeholder="아이디" />
	<input type="password" name="password" placeholder="비밀번호" />
	<button type="submit">가입</button>
</form>
```

#### **📌 전송 과정**

1. 사용자가 **폼 입력칸에 데이터를 입력하고 전송 버튼을 클릭**
2. **브라우저가 input 태그 값을 읽고 서버로 전송**
3. **서버가 데이터를 처리하고 응답 반환**

#### **📌 POST 요청 예시**

```http
POST /register HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

username=user&password=1234
```

#### **📌 Content-Type 헤더 종류**

HTML Form을 통한 데이터 전송에는 여러 **Content-Type** 형식이 사용된다.

| Content-Type                        | 설명                                            |
| ----------------------------------- | ----------------------------------------------- |
| `application/x-www-form-urlencoded` | 기본 폼 데이터 인코딩 방식 (쿼리 스트링과 유사) |
| `multipart/form-data`               | 파일 업로드 및 복합 데이터 전송 시 사용         |
| `application/json`                  | JSON 형식으로 데이터를 전송할 때 사용           |

##### **1️⃣ `application/x-www-form-urlencoded`**

- 기본적인 Form 데이터 전송 방식
- URL 인코딩된 `key=value` 형태로 데이터를 전송  
  (예: `username=johndoe&password=1234`)

##### **2️⃣ `multipart/form-data`**

- **파일 업로드 시 사용**
- HTTP 메시지에서 **임의의 구분자(boundary)** 를 추가하여 각 데이터 간 구분

##### **3️⃣ `application/json`**

- JSON 형식으로 데이터를 전송
- 프론트엔드와 백엔드 간 API 요청 시 많이 사용됨

### 3.3. 파일 데이터 전송 과정

**파일 업로드는 `multipart/form-data`를 사용하여 서버로 전송된다.**

#### **📌 enctype 속성 설정**

HTML `<form>`에서 파일을 전송할 경우, `enctype="multipart/form-data"` 속성을 추가해야 한다.

- **enctype을 `multipart/form-data`로 설정하면, 폼에 파일 데이터가 포함된다는 것을 서버에 알린다.**
- **바이너리 데이터 전송에 사용된다.**
- **multipart/form-data 형식에서는 HTTP 메시지에 임의의 구분자(`------XXX`)가 포함되어 Form 데이터 간 구분이 가능하다.**
- **하나의 요청에서 여러 개의 Content-Type 데이터를 전송할 수 있다.**

#### **📌 HTML Form 예시**

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
	<input type="file" name="file" />
	<button type="submit">업로드</button>
</form>
```

#### **📌 POST 요청 예시 (파일 업로드)**

```http
POST /upload HTTP/1.1
Host: example.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="example.jpg"
Content-Type: image/jpeg

(binary file data)
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

#### **📌 처리 과정**

1. 클라이언트가 **파일을 선택하고 업로드 버튼을 클릭**
2. **브라우저가 파일 데이터를 `multipart/form-data` 형식으로 변환하여 서버로 전송**
3. **서버가 파일을 수신하고 저장**
4. **파일 저장 후 응답 반환**

---

## 4. HTTP 메서드 - PUT

PUT 메서드는 **리소스를 대체(수정)하는 메서드 (Update)** 이다.

- **기존 리소스가 존재하면 덮어쓰기(Update), 없으면 새로 생성(Create)한다.**
- **데이터를 대체해야 하므로, 클라이언트가 리소스의 구체적인 전체 경로를 지정해야 한다.**
- 예를 들어:
  - **POST** `/members` → 새로운 멤버 추가
  - **PUT** `/members/100` → 100번 멤버 수정

### 📌 예제 설명

- 클라이언트가 `/members/100` 리소스를 대상으로 PUT 요청을 보낸다고 가정
- 해당 리소스가 존재하면 **완전히 덮어쓴다**
- 해당 리소스가 없으면 **새로운 리소스를 생성한다**

## 4.1. PUT 요청에 리소스가 있는 경우

기존에 **100번 멤버의 데이터가 존재**할 때, 새로운 데이터로 **완전히 덮어쓰는 요청**을 보낸다.

### **📌 PUT 요청 예시 (100번 멤버 수정)**

```http
PUT /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Updated User",
  "email": "updated@example.com"
}
```

### **📌 처리 과정**

1. 클라이언트가 `/members/100` 리소스를 대상으로 PUT 요청을 보냄
2. **서버는 기존 100번 멤버 데이터를 삭제하고** 요청된 데이터로 새로 저장
3. 응답 반환

### **📌 응답 예시**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 100,
  "name": "Updated User",
  "email": "updated@example.com"
}
```

- **`200 OK`** → 요청이 정상적으로 처리되었음
- **기존 데이터가 완전히 덮어쓰여 새로운 데이터로 변경됨**

## 4.2. PUT 요청에 리소스가 없는 경우

100번 멤버가 **존재하지 않을 때**, 클라이언트가 **PUT 요청을 보내면 새로운 리소스를 생성**한다.

### **📌 PUT 요청 예시 (100번 멤버 신규 생성)**

```http
PUT /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "New User",
  "email": "new@example.com"
}
```

### **📌 처리 과정**

1. 클라이언트가 `/members/100`에 대한 PUT 요청을 보냄
2. **서버는 100번 멤버가 존재하지 않음을 확인**
3. **새로운 100번 멤버를 생성하고 저장**
4. 응답 반환

### **📌 응답 예시**

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /members/100

{
  "id": 100,
  "name": "New User",
  "email": "new@example.com"
}
```

- **`201 Created`** → 새로운 리소스가 성공적으로 생성됨
- **Location 헤더** → 생성된 리소스의 경로(`/members/100`) 반환

## 4.3. PUT 요청에 일부 리소스만 변경하길 원할 경우

**PUT은 리소스를 전체적으로 대체하기 때문에, 일부 데이터만 변경하려면 주의해야 한다.**  
예를 들어 **이메일만 변경하려고 PUT 요청을 보낼 경우, 기존 이름 데이터가 삭제될 수 있다.**

### **📌 PUT 요청 예시 (email만 변경하려고 시도)**

```http
PUT /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "test@test.com"
}
```

### **📌 처리 과정**

1. 클라이언트가 `/members/100`에 대해 PUT 요청을 보냄
2. **서버가 기존 데이터를 삭제하고** 새로운 데이터로 덮어씀
3. **이름 데이터(`name`)가 사라짐**

### **📌 응답 예시**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 100,
  "email": "test@test.com"
}
```

- **이전 데이터(name 필드)가 사라짐** → 덮어쓰기가 발생했기 때문

### **📌 해결 방법**

✅ **일부 데이터만 변경할 경우에는 PUT이 아니라 PATCH를 사용해야 한다.**

```http
PATCH /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "test@test.com"
}
```

- **PATCH는 리소스의 특정 필드만 변경**
- 기존 데이터는 유지되면서, 변경된 부분만 업데이트됨

### 📌 **PUT과 PATCH의 차이점**

| 메서드    | 설명                                      |
| --------- | ----------------------------------------- |
| **PUT**   | 리소스 전체를 대체 (기존 데이터 덮어쓰기) |
| **PATCH** | 리소스의 일부만 수정 (필요한 필드만 변경) |

---

## 5. HTTP 메서드 - PATCH

PATCH 메서드는 **리소스의 일부만 수정(Update)할 때 사용**된다.

- **기존 데이터 중 변경하고 싶은 필드만 포함하여 요청**
- **PUT과 달리 리소스 전체를 덮어쓰지 않고 특정 필드만 변경 가능**

📌 **PATCH와 PUT의 차이점**
| 메서드 | 설명 |
|--------|----------------------------------|
| **PUT** | 리소스 전체를 대체 (덮어쓰기) |
| **PATCH** | 리소스의 일부만 수정 |

### 📌 만일 서버가 PATCH를 지원하지 않는다면?

- 일부 서버에서는 `PATCH` 메서드를 지원하지 않을 수 있음  
  (예: 일부 REST API 또는 오래된 서버)
- 이 경우, **PUT 메서드를 사용하지만, 기존 데이터를 유지하면서 필요한 필드만 변경해야 함**
- 방법:
  - **1️⃣ 클라이언트가 먼저 GET 요청을 보내 기존 데이터를 가져옴**
  - **2️⃣ 변경할 필드를 수정**
  - **3️⃣ 변경된 데이터 전체를 포함한 PUT 요청을 보냄**

예를 들어, `PATCH`를 지원하지 않는 경우:

```http
# 기존 데이터 가져오기
GET /members/100 HTTP/1.1
Host: example.com
```

서버 응답:

```json
{
	"user": "User100",
	"age": 35
}
```

이후 클라이언트가 변경할 필드만 수정한 후, PUT 요청을 보냄:

```http
PUT /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "user": "User100",
  "age": 42
}
```

✅ **이 방식은 기존 데이터를 유지하면서 필요한 부분만 업데이트하는 대체 방법**  
(하지만 가능하면 `PATCH`를 지원하는 서버를 사용하는 것이 더 좋음!)

## **PATCH 요청 예시**

### **예제 상황**

- 기존 데이터:

```json
{
	"user": "User100",
	"age": 35
}
```

- 클라이언트가 `PATCH /members/100` 요청을 보내 `age`만 `42`로 변경하려고 함

### **📌 PATCH 요청 예시 (100번 멤버의 age 값만 변경)**

```http
PATCH /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "age": 42
}
```

### **📌 클라이언트-서버 요청 과정**

1. 클라이언트가 `PATCH /members/100` 요청을 보냄 (수정할 필드만 포함)
2. 서버가 기존 데이터에서 **`age` 필드만 변경**
3. 변경된 데이터를 응답으로 반환

### **📌 서버 응답 예시**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": "User100",
  "age": 42
}
```

✅ 기존 데이터는 유지되면서, `age` 값만 수정됨

## **📌 PATCH vs PUT 차이점 다시 확인**

| 메서드    | 데이터 변경 방식                                               |
| --------- | -------------------------------------------------------------- |
| **PATCH** | 일부 필드만 변경                                               |
| **PUT**   | 전체 리소스를 덮어씀 (일부만 보내면 기존 데이터가 사라질 위험) |

✅ **즉, 일부 필드만 변경하고 싶을 때는 PATCH를 사용!**  
✅ **PATCH를 지원하지 않는 서버에서는 GET → PUT을 활용!**

---

## 6. HTTP 메서드 - DELETE

DELETE 메서드는 **특정 리소스를 삭제할 때 사용**된다.

- **리소스를 삭제하는 작업이므로, 일반적으로 서버에서 되돌릴 수 없음 (영구 삭제)**
- **RESTful API에서는 클라이언트가 삭제할 리소스의 경로를 명확히 지정해야 함**
- **DELETE 요청을 보낼 때, 요청 본문(body)이 필요하지 않음**
- **응답 데이터는 일반적으로 비워두거나 삭제 결과를 반환할 수 있음**

## **📌 DELETE 요청 예시**

```http
DELETE /members/100 HTTP/1.1
Host: example.com
```

### **📌 예제 상황**

- 기존 데이터:

```json
{
	"id": 100,
	"user": "User100",
	"email": "user100@example.com"
}
```

- 클라이언트가 `DELETE /members/100` 요청을 보내 **100번 멤버 삭제** 요청

### **📌 클라이언트-서버 요청 과정**

1. 클라이언트가 `DELETE /members/100` 요청을 보냄
2. 서버가 **해당 리소스가 존재하는지 확인**
3. 리소스를 **삭제 처리**
4. 삭제 완료 후 응답 반환

### **📌 서버 응답 예시**

```http
HTTP/1.1 204 No Content
```

✅ **`204 No Content`** → 요청이 성공했으며, 별도 응답 본문이 필요 없음

📌 **만약 삭제된 데이터를 응답으로 반환해야 한다면?**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "User 100 deleted successfully"
}
```

✅ **`200 OK`** → 삭제 성공 후, 추가적인 응답 데이터를 제공

## **📌 DELETE 요청 시 주의할 점**

### ❌ **DELETE 요청은 되돌릴 수 없음**

- 삭제된 데이터는 일반적으로 복구할 수 없으므로, **신중히 요청을 보내야 함**
- 만약 **소프트 삭제(soft delete)를 원한다면**, 실제 삭제 대신 `is_deleted: true` 같은 필드를 추가하는 방식을 사용

### ❌ **DELETE 요청에서 본문(body)을 보내지 않음**

- DELETE 요청에는 **일반적으로 본문(body)이 필요하지 않음**
- 일부 서버에서는 DELETE 요청에 본문이 포함될 경우, 요청을 거부할 수도 있음

## **📌 DELETE 응답 상태 코드**

| 상태 코드          | 설명                                                     |
| ------------------ | -------------------------------------------------------- |
| **204 No Content** | 리소스가 삭제되었고, 응답 본문이 필요 없음 (가장 일반적) |
| **200 OK**         | 리소스가 삭제되었으며, 응답 본문이 포함됨                |
| **404 Not Found**  | 삭제할 리소스를 찾을 수 없음                             |

✅ **즉, DELETE는 리소스를 삭제하는 요청!**  
✅ **일반적으로 `204 No Content`를 응답으로 받지만, 필요에 따라 `200 OK`로 응답할 수도 있음**

---

아래는 **HEAD 메서드**를 이전과 비슷한 틀로 정리한 **Markdown 코드**야.  
이제 원하는 곳에 복사해서 추가하면 돼! 🚀

---

## 7. HTTP 메서드 - HEAD

HEAD 메서드는 **GET과 유사하지만, 응답 본문을 포함하지 않고 헤더 정보만 반환**하는 메서드다.

- **리소스의 존재 여부를 확인할 때 사용**
- **GET 요청과 동일한 방식으로 동작하지만, 응답 본문을 반환하지 않음**
- **데이터를 가져오지 않고, 요청에 대한 메타데이터(헤더)만 확인할 때 유용**

## **📌 HEAD 요청 예시**

```http
HEAD /members/100 HTTP/1.1
Host: example.com
```

### **📌 예제 상황**

- 클라이언트가 `HEAD /members/100` 요청을 보냄
- 서버는 `GET /members/100`과 동일한 헤더를 반환하지만, 본문 데이터는 포함하지 않음

### **📌 클라이언트-서버 요청 과정**

1. 클라이언트가 `HEAD /members/100` 요청을 보냄
2. 서버가 해당 리소스가 존재하는지 확인
3. **본문 없이 헤더만 응답으로 반환**

### **📌 서버 응답 예시**

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 125
ETag: "5d8c72a1e4b0"
Last-Modified: Wed, 20 Mar 2024 12:00:00 GMT
```

✅ **`200 OK`** → 리소스가 존재하며, 헤더 정보만 반환됨  
✅ **`Content-Length`** → 응답 본문의 크기를 확인 가능  
✅ **`ETag` / `Last-Modified`** → 캐싱을 위한 정보 제공

## **📌 HEAD 메서드 사용 사례**

| 사용 사례                   | 설명                                                                |
| --------------------------- | ------------------------------------------------------------------- |
| **리소스의 존재 여부 확인** | 특정 리소스가 존재하는지 확인 (`200 OK` or `404 Not Found`)         |
| **응답 크기 확인**          | `Content-Length` 값을 확인하여 본문 크기 미리 측정                  |
| **캐시 유효성 검사**        | `ETag`, `Last-Modified` 값을 사용하여 캐시된 데이터가 최신인지 확인 |

✅ **즉, HEAD는 GET처럼 요청하지만, 응답 본문 없이 헤더 정보만 확인!**  
✅ **리소스를 다운로드하거나 API 요청 전에 데이터 상태를 확인할 때 유용!**

---

## 참고 자료

HTTP 메서드에 대한 더 자세한 내용은 아래 자료를 참고하세요:

- 🔗 [HTTP 메서드 종류 및 통신 과정 총정리 - inpa 블로그](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-HTTP-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%A2%85%EB%A5%98-%ED%86%B5%EC%8B%A0-%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC)
- 🔗 [HTTP 메서드 개념 및 사용법 - youwjune 블로그](https://youwjune.tistory.com/42)
- 🔗 [MDN 웹 문서 - HTTP 메서드 공식 문서](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Methods)
- 🔗 [MDN 웹 문서 - HTTP 메서드 공식 문서](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)
- 🔗 [김영한님 인프런 강의 - HTTP 웹 네트워크 개념](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)

---

# 발표 대본 및 질문 리스트 추출

<details>
 <summary> <b>🗣 발표 대본</b> </summary>

### **🗣 발표 시작**

안녕하세요, 여러분!  
오늘은 **웹에서 클라이언트와 서버가 어떻게 데이터를 주고받는지**를 결정하는 **HTTP 메서드**에 대해 이야기해 보겠습니다.

HTTP 메서드는 **서버와 클라이언트가 정보를 교환하는 방식**을 정의하는 요청 방식입니다.  
예를 들어, 웹사이트에서 버튼을 클릭하거나, 게시글을 작성하거나, 검색을 할 때 모두 HTTP 메서드가 사용됩니다.  
그럼, 가장 많이 쓰이는 HTTP 메서드 6가지를 하나씩 살펴보겠습니다!

---

## **1️⃣ GET - 데이터 조회 요청**

**GET은 서버에서 데이터를 가져올 때 사용합니다.**  
예를 들어, 우리가 **구글에서 검색을 할 때** `GET /search?q=HTTP` 같은 요청이 서버로 전달됩니다.  
이때 **데이터를 변경하지 않고 단순히 가져오기만 하므로 안전한 메서드**입니다.

📌 **실무 예제:**

```http
GET /users/123 HTTP/1.1
Host: example.com
```

- 여기서 `GET /users/123`은 **123번 사용자 정보를 가져오라는 요청**입니다.
- 브라우저에서 뉴스 사이트를 새로고침할 때도 GET 요청이 사용됩니다.

✅ **주의할 점:**

- GET 요청은 **URL에 데이터를 담아 보내기 때문에** 보안이 중요한 데이터에는 적합하지 않습니다!  
  (예: 비밀번호, 개인 정보 등)

---

## **2️⃣ POST - 새로운 데이터 생성 요청**

POST는 **서버에 데이터를 추가할 때 사용**됩니다.  
예를 들어, **회원가입을 할 때 입력한 정보를 서버에 저장**할 때 POST 요청을 보냅니다.

📌 **실무 예제:**

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

- `POST /users` → 새로운 사용자를 추가하는 요청입니다.
- **기존 데이터에는 영향을 주지 않고 새로운 데이터를 생성합니다.**

✅ **주의할 점:**

- POST 요청은 **반복하면 중복 데이터가 생성될 수 있기 때문에, 주의가 필요합니다!**

---

## **3️⃣ PUT - 전체 데이터 수정 요청**

PUT은 **기존 데이터를 수정하거나, 데이터가 없으면 새로 생성하는 역할**을 합니다.  
**기존 데이터를 완전히 덮어쓰기 때문에 조심해야 합니다!**

📌 **실무 예제:**

```http
PUT /users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Updated Alice",
  "email": "alice@example.com"
}
```

- `PUT /users/123` → **123번 사용자의 데이터를 업데이트**하는 요청입니다.
- 기존 데이터가 삭제되고, **새로운 데이터로 완전히 대체됩니다.**

✅ **주의할 점:**

- 일부만 수정하려면 **PATCH**를 사용하는 것이 더 적절합니다!

---

## **4️⃣ PATCH - 일부 데이터 수정 요청**

PATCH는 **리소스의 특정 부분만 수정할 때 사용**됩니다.  
예를 들어, 사용자의 이메일만 변경할 때 적합합니다.

📌 **실무 예제:**

```http
PATCH /users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

- `PATCH /users/123` → **123번 사용자의 이메일만 변경**하는 요청입니다.
- 기존 데이터는 유지된 채, 변경된 부분만 수정됩니다.

✅ **주의할 점:**

- **PATCH를 지원하지 않는 서버에서는 PUT을 사용하여 데이터를 갱신하는 방법도 고려해야 합니다.**

---

## **5️⃣ DELETE - 데이터 삭제 요청**

DELETE는 **서버에서 특정 데이터를 삭제할 때 사용**됩니다.  
예를 들어, **게시판에서 글을 삭제할 때** DELETE 요청이 사용됩니다.

📌 **실무 예제:**

```http
DELETE /users/123 HTTP/1.1
Host: example.com
```

- `DELETE /users/123` → **123번 사용자를 삭제하는 요청**입니다.
- DELETE 요청은 보통 응답 본문이 없이 `204 No Content` 상태 코드를 반환합니다.

✅ **주의할 점:**

- DELETE 요청은 **되돌릴 수 없기 때문에 신중하게 사용해야 합니다.**
- 완전히 삭제하는 대신 **"is_deleted: true"** 같은 소프트 삭제(Soft Delete) 방식을 사용할 수도 있습니다.

---

## **6️⃣ HEAD - 응답의 헤더만 요청**

HEAD는 GET과 유사하지만, **응답 본문을 제외한 헤더 정보만 요청**할 때 사용됩니다.  
예를 들어, **파일 크기를 미리 확인하거나, 리소스가 존재하는지 확인**할 때 유용합니다.

📌 **실무 예제:**

```http
HEAD /users/123 HTTP/1.1
Host: example.com
```

- `HEAD /users/123` → **123번 사용자의 정보가 있는지 확인하는 요청**
- 응답 본문은 없고, 응답 헤더에 `Content-Length` 같은 정보만 포함됩니다.

✅ **사용 사례:**

- **파일 다운로드 전에 파일 크기 확인**
- **웹 페이지가 변경되었는지 캐시 검증**

---

### **🗣 발표 마무리**

오늘은 **웹에서 서버와 데이터를 주고받는 HTTP 메서드**에 대해 알아봤습니다.  
요약하면,  
✔ **GET** → 데이터를 조회할 때  
✔ **POST** → 데이터를 새로 만들 때  
✔ **PUT** → 데이터를 전체 수정할 때  
✔ **PATCH** → 데이터를 일부 수정할 때  
✔ **DELETE** → 데이터를 삭제할 때  
✔ **HEAD** → 응답의 헤더만 가져올 때

HTTP 메서드를 잘 이해하면, API 요청을 더 효율적으로 사용할 수 있습니다!  
더 궁금한 점이 있으면 질문해주세요! 감사합니다! 😊

</details>

---

## ✅ **기술 면접 핵심 질문 5개 + 답변**

**Q1. GET과 POST의 차이점은 무엇인가요?**

> **답변:**
>
> - GET은 **조회 요청**, POST는 **데이터 생성 요청**입니다.
> - GET 요청은 **URL에 데이터를 포함**하여 보내고, POST 요청은 **본문(body)에 데이터를 포함**합니다.
> - GET은 **캐싱이 가능**하지만, POST는 보통 캐싱되지 않습니다.
> - **예제:**
>   - `GET /search?q=hello` (검색 요청)
>   - `POST /users` (새로운 사용자 생성 요청)

---

**Q2. PUT과 PATCH의 차이점은 무엇인가요?**

> **답변:**
>
> - PUT은 **전체 데이터를 교체**, PATCH는 **일부 데이터만 변경**합니다.
> - **예제:**
>   - `PUT /users/123` → 기존 사용자 데이터를 **완전히 덮어씀**
>   - `PATCH /users/123` → 특정 필드만 **수정**

---

**Q3. DELETE 요청은 왜 주의해야 하나요?**

> **답변:**
>
> - DELETE 요청은 **데이터를 영구적으로 삭제**할 수 있기 때문에 신중하게 사용해야 합니다.
> - 되돌릴 수 없는 경우가 많기 때문에 **소프트 삭제(Soft Delete)** 방식도 고려해야 합니다.

---

**Q4. HEAD 요청은 언제 사용하나요?**

> **답변:**
>
> - HEAD 요청은 **응답 본문 없이 헤더 정보만 확인**할 때 사용됩니다.
> - **예제:** 파일을 다운로드하기 전에 **파일 크기(Content-Length) 확인**

---

**Q5. HTTP 메서드 중 가장 안전한 요청 방식은 무엇인가요?**

> **답변:**
>
> - GET과 HEAD는 **데이터를 변경하지 않으므로** 상대적으로 안전한 메서드입니다.
> - 반대로 **POST, PUT, DELETE는 서버 상태를 변경**하므로 주의해야 합니다.

---
