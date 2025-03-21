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
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...

------WebKitFormBoundary...
Content-Disposition: form-data; name="file"; filename="example.jpg"
Content-Type: image/jpeg

(binary file data)
------WebKitFormBoundary...--
```

#### **📌 처리 과정**

1. 클라이언트가 **파일을 선택하고 업로드 버튼을 클릭**
2. **브라우저가 파일 데이터를 `multipart/form-data` 형식으로 변환하여 서버로 전송**
3. **서버가 파일을 수신하고 저장**
4. **파일 저장 후 응답 반환**

---

### **4. HTTP 메서드 - PUT**

PUT 메서드는 **리소스를 대체(수정)하는 메서드 (Update)** 이다.

- **기존 리소스가 존재하면 덮어쓰기(Update), 없으면 새로 생성(Create)한다.**
- **데이터를 대체해야 하므로, 클라이언트가 리소스의 구체적인 전체 경로를 지정해야 한다.**
- 예를 들어:
  - **POST** `/members` → 새로운 멤버 추가
  - **PUT** `/members/100` → 100번 멤버 수정

### **4.1. PUT 요청에 리소스가 있는 경우**

기존에 **100번 멤버의 데이터가 존재**할 때, 새로운 데이터로 **완전히 덮어쓰는 요청**을 보낸다.

#### **📌 PUT 요청 예시 (100번 멤버 수정)**

```http
PUT /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Updated User",
  "email": "updated@example.com"
}
```

#### **📌 처리 과정**

1. 클라이언트가 `/members/100` 리소스를 대상으로 PUT 요청을 보냄
2. **서버는 기존 100번 멤버 데이터를 삭제하고** 요청된 데이터로 새로 저장
3. 응답 반환

#### **📌 응답 예시**

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

### **4.2. PUT 요청에 리소스가 없는 경우**

100번 멤버가 **존재하지 않을 때**, 클라이언트가 **PUT 요청을 보내면 새로운 리소스를 생성**한다.

#### **📌 PUT 요청 예시 (100번 멤버 신규 생성)**

```http
PUT /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "New User",
  "email": "new@example.com"
}
```

#### **📌 처리 과정**

1. 클라이언트가 `/members/100`에 대한 PUT 요청을 보냄
2. **서버는 100번 멤버가 존재하지 않음을 확인**
3. **새로운 100번 멤버를 생성하고 저장**
4. 응답 반환

#### **📌 응답 예시**

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

### **4.3. PUT 요청에 일부 리소스만 변경하길 원할 경우**

**PUT은 리소스를 전체적으로 대체하기 때문에, 일부 데이터만 변경하려면 주의해야 한다.**  
예를 들어 **이메일만 변경하려고 PUT 요청을 보낼 경우, 기존 이름 데이터가 삭제될 수 있다.**

#### **📌 PUT 요청 예시 (email만 변경하려고 시도)**

```http
PUT /members/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "test@test.com"
}
```

#### **📌 처리 과정**

1. 클라이언트가 `/members/100`에 대해 PUT 요청을 보냄
2. **서버가 기존 데이터를 삭제하고** 새로운 데이터로 덮어씀
3. **이름 데이터(`name`)가 사라짐**

#### **📌 응답 예시**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 100,
  "email": "test@test.com"
}
```

- **이전 데이터(name 필드)가 사라짐** → 덮어쓰기가 발생했기 때문

#### **📌 해결 방법**

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

### **📌 PUT과 PATCH의 차이점**

| 메서드    | 설명                                      |
| --------- | ----------------------------------------- |
| **PUT**   | 리소스 전체를 대체 (기존 데이터 덮어쓰기) |
| **PATCH** | 리소스의 일부만 수정 (필요한 필드만 변경) |

## **5. HTTP 메서드 - PATCH**

PATCH 메서드는 **리소스의 일부만 수정(Update)할 때 사용**된다.

- **기존 데이터 중 변경하고 싶은 필드만 포함하여 요청**
- **PUT과 달리 리소스 전체를 덮어쓰지 않고 특정 필드만 변경 가능**

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

### **📌 PATCH vs PUT vs POST 차이점**

| 메서드    | 설명                                                            |
| --------- | --------------------------------------------------------------- |
| **PUT**   | 리소스 전체를 덮어씀 (기존 데이터를 삭제 후 새로운 데이터 저장) |
| **PATCH** | 리소스의 일부만 수정                                            |
| **POST**  | 새로운 리소스를 생성 (서버가 새로운 ID를 할당)                  |

### **📌 PATCH를 지원하지 않는 경우**

- 일부 서버에서는 `PATCH` 메서드를 지원하지 않을 수 있음  
  (예: 일부 REST API 또는 오래된 서버)
- 이 경우 **PATCH 대신 POST를 활용해야 함**  
  (PUT은 리소스를 전체적으로 덮어쓰므로 적절하지 않음)

✅ **PATCH를 지원하지 않는 경우에는 POST를 사용하여 업데이트 엔드포인트를 따로 설계하는 것이 권장됨!**  
✅ **PUT은 기존 리소스를 완전히 덮어쓰므로 부분 변경에는 적절하지 않음!**

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

<details>
  <summary>
  📌 발표 대본
  </summary>

#### **🔸 발표 시작**

"안녕하세요, 여러분.  
오늘은 웹 개발에서 필수적인 개념인 **HTTP 메서드**에 대해 이야기하겠습니다.

HTTP는 우리가 웹사이트를 방문할 때 브라우저와 서버 간의 데이터를 주고받는 규칙을 정의하는 프로토콜입니다.  
이 중에서도 HTTP 메서드는 특정 작업을 수행하는 명령어라고 할 수 있습니다.

예를 들어, 여러분이 웹사이트에서 **회원가입을 하거나, 게시글을 읽거나, 댓글을 남길 때**도 HTTP 메서드가 동작하고 있습니다.  
그럼 HTTP 메서드가 실제 웹 개발에서 어떻게 사용되는지 살펴보겠습니다."

---

### **🔹 HTTP 메서드 개요**

"HTTP 메서드는 여러 가지가 있지만, 오늘은 실무에서 가장 많이 사용되는 **다섯 가지**에 대해 집중적으로 설명하겠습니다.

| 메서드     | 역할 설명                                                              |
| ---------- | ---------------------------------------------------------------------- |
| **GET**    | 데이터를 조회할 때 사용 (예: 게시글 보기)                              |
| **POST**   | 새로운 데이터를 생성할 때 사용 (예: 회원가입, 댓글 작성)               |
| **PUT**    | 기존 데이터를 전체적으로 수정하거나 없으면 생성 (예: 사용자 정보 수정) |
| **PATCH**  | 기존 데이터의 일부만 변경할 때 사용 (예: 비밀번호 변경)                |
| **DELETE** | 데이터를 삭제할 때 사용 (예: 댓글 삭제)                                |

이제 실무에서 어떻게 사용되는지 **예제**를 통해 알아보겠습니다."

---

### **🔹 실무 예시: 회원 관리 시스템**

"웹 개발에서 HTTP 메서드는 RESTful API와 함께 사용됩니다.  
회원 관리 시스템을 예로 들어 **GET, POST, PUT, PATCH, DELETE** 메서드를 살펴보겠습니다."

#### **✅ 1. 회원 정보 조회 (GET)**

"사용자가 자신의 프로필을 조회할 때, 클라이언트는 다음과 같은 요청을 보냅니다."

```http
GET /users/100 HTTP/1.1
Host: example.com
```

"이 요청을 받은 서버는 `100번` 회원의 정보를 반환합니다."

```json
{
	"id": 100,
	"name": "Alice",
	"email": "alice@example.com"
}
```

---

#### **✅ 2. 새로운 회원 가입 (POST)**

"새로운 사용자가 회원가입을 하면, `POST` 요청을 통해 데이터를 서버로 전송합니다."

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Bob",
  "email": "bob@example.com",
  "password": "securepassword"
}
```

"서버는 데이터를 저장하고 새로운 사용자 ID를 생성하여 응답합니다."

```http
HTTP/1.1 201 Created
Location: /users/101
```

---

#### **✅ 3. 회원 정보 수정 (PUT vs PATCH)**

"사용자가 자신의 정보를 수정하려면 두 가지 방법이 있습니다."

1️⃣ **PUT을 사용하면 전체 데이터를 갱신합니다.**  
모든 데이터를 다시 보내야 하며, 누락된 값은 삭제될 수 있습니다.

```http
PUT /users/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alice Updated",
  "email": "alice.new@example.com"
}
```

2️⃣ **PATCH를 사용하면 일부만 변경할 수 있습니다.**  
이메일만 변경할 경우:

```http
PATCH /users/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "alice.new@example.com"
}
```

🔹 **PUT은 전체 데이터를 교체하지만, PATCH는 필요한 데이터만 수정합니다.**  
실무에서는 대부분 **PATCH를 선호**하는데, 불필요한 데이터 삭제를 방지할 수 있기 때문입니다.

---

### **🔹 PATCH를 지원하지 않는 경우 (POST 활용)**

"그러나, 일부 서버에서는 PATCH를 지원하지 않을 수도 있습니다.  
이럴 경우, **POST 메서드를 활용하여 별도의 엔드포인트를 만들어 업데이트를 수행하는 방식**을 사용할 수 있습니다."

#### **✅ 1. POST 기반의 업데이트 엔드포인트 활용**

PATCH를 지원하지 않는 경우, 보통 다음과 같은 방식으로 해결합니다.

```http
POST /users/100/update-email HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "alice.new@example.com"
}
```

✅ 이 요청을 받으면 서버는 내부적으로 100번 사용자 이메일만 수정하는 로직을 실행합니다.  
이렇게 하면 PATCH 없이도 일부 데이터를 수정할 수 있습니다.

즉, **PATCH가 지원되지 않는 서버에서는 POST를 활용하여 특정 필드만 수정하는 API 엔드포인트를 별도로 만들어야 합니다.**

---

#### **✅ 4. 회원 탈퇴 (DELETE)**

"회원이 탈퇴하면 `DELETE` 요청이 전송됩니다."

```http
DELETE /users/100 HTTP/1.1
Host: example.com
```

"서버는 사용자를 삭제하고 `204 No Content` 응답을 반환합니다."

```http
HTTP/1.1 204 No Content
```

✅ **DELETE 요청에는 보통 본문이 포함되지 않습니다.**  
리소스를 식별하는 정보는 URL에 포함되어 있기 때문입니다.

---

### **🔹 결론 및 Q&A**

"지금까지 실무에서 자주 사용하는 HTTP 메서드에 대해 설명드렸습니다.  
🔹 **GET** - 데이터를 조회할 때  
🔹 **POST** - 새로운 데이터를 생성할 때  
🔹 **PUT** - 데이터를 전체적으로 수정할 때  
🔹 **PATCH** - 데이터를 부분적으로 수정할 때  
🔹 **DELETE** - 데이터를 삭제할 때 사용합니다.

또한, **PATCH를 지원하지 않는 경우 POST를 활용하는 방법**도 살펴보았습니다.

이제 여러분이 개발할 때 **"이 작업은 GET이 맞을까, 아니면 POST일까?"** 같은 고민을 할 때, 보다 명확한 기준을 가질 수 있을 것입니다.  
감사합니다!"

</details>

---

### **📌 최종 정리된 기술 면접 질문 및 상세 답변 (예제 포함)**

---

### **1️⃣ PUT과 PATCH의 차이점은 무엇인가요?**

✅ **PUT**은 리소스를 **전체적으로 교체**하는 메서드이고,  
✅ **PATCH**는 리소스의 **일부만 수정**하는 메서드입니다.

**예제 1: 사용자 정보 수정**  
사용자가 **이메일만 변경**하고 싶을 때를 가정해봅시다.

📌 **PUT 요청 (전체 데이터 교체)**

```http
PUT /users/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice.new@example.com"
}
```

👉 **이 경우, 기존 데이터가 전체적으로 교체됩니다.**  
👉 만약 `name` 값을 포함하지 않으면 기존 이름 정보가 **삭제**될 수도 있습니다.

📌 **PATCH 요청 (일부 데이터 수정)**

```http
PATCH /users/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "alice.new@example.com"
}
```

👉 **이 경우, `email`만 수정되고 `name` 값은 그대로 유지됩니다.**

✅ **결론:**

- **PUT은 전체 데이터를 교체**해야 하므로, 필요한 필드가 모두 포함되어야 합니다.
- **PATCH는 일부 필드만 변경**할 수 있으므로, 불필요한 데이터 손실이 없습니다.
- **실무에서는 PATCH가 PUT보다 더 많이 사용되는 경우가 많습니다.**

---

### **2️⃣ GET 요청에서 본문(body)을 포함할 수 있나요?**

✅ HTTP 표준에서는 **GET 요청에 본문을 포함하는 것이 허용되지만, 일반적으로 사용되지 않습니다.**  
✅ 대부분의 서버 및 브라우저는 GET 요청의 본문을 **무시**합니다.  
✅ 데이터 전달이 필요하다면 **쿼리 스트링(Query String)을 이용해야 합니다.**

**예제 1: 올바른 GET 요청 (쿼리 스트링 사용)**

```http
GET /search?q=hello&lang=ko HTTP/1.1
Host: example.com
```

👉 **이 방식이 일반적인 GET 요청의 데이터 전달 방법입니다.**

**예제 2: GET 요청에 본문 포함 (비표준, 서버가 지원하지 않을 가능성 높음)**

```http
GET /search HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "query": "hello",
  "lang": "ko"
}
```

👉 **대부분의 서버가 GET 요청의 본문을 지원하지 않으므로, 이런 방식은 잘 사용되지 않습니다.**

✅ **결론:**

- GET 요청에서 데이터를 전달할 때는 **쿼리 스트링을 활용**해야 합니다.
- **본문을 포함한 GET 요청은 대부분의 웹 서버에서 지원되지 않습니다.**

---

### **3️⃣ POST와 PUT의 차이점은 무엇인가요?**

✅ **POST**는 새로운 리소스를 생성하는 메서드입니다.  
✅ **PUT**은 기존 리소스를 덮어쓰거나, 해당 리소스가 존재하지 않으면 새로 생성합니다.

📌 **예제 1: 회원가입 (POST)**

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

👉 **POST 요청을 보낼 때마다 새로운 사용자가 생성됩니다.**  
👉 서버는 새로운 사용자 ID를 자동으로 생성하고 응답합니다.

```http
HTTP/1.1 201 Created
Location: /users/100
```

✅ **즉, POST는 동일한 요청을 여러 번 보내면 새로운 리소스가 계속 추가됩니다.**

📌 **예제 2: 사용자 정보 수정 (PUT)**

```http
PUT /users/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alice Updated",
  "email": "alice.new@example.com"
}
```

👉 **PUT 요청을 보낼 경우, 기존 데이터를 덮어씁니다.**  
👉 같은 요청을 여러 번 보내도 항상 동일한 결과가 나옵니다.

✅ **결론:**

- **POST는 새로운 리소스를 생성**할 때 사용되며, 같은 요청을 반복하면 **새로운 데이터가 계속 추가**됩니다.
- **PUT은 기존 리소스를 덮어쓰기** 때문에, **같은 요청을 여러 번 보내도 결과가 동일**합니다.

---

### **4️⃣ DELETE 요청은 본문(body)을 포함할 수 있나요?**

✅ **원칙적으로 DELETE 요청에는 본문을 포함하지 않는 것이 표준입니다.**  
✅ 대부분의 서버는 DELETE 요청의 본문을 **무시**하거나 **오류를 반환**할 수도 있습니다.  
✅ 삭제할 리소스를 URL에 명시하는 것이 일반적입니다.

📌 **예제 1: 일반적인 DELETE 요청**

```http
DELETE /users/100 HTTP/1.1
Host: example.com
```

👉 **이 요청을 받은 서버는 `100번 사용자`를 삭제합니다.**  
👉 응답으로 보통 `204 No Content` 상태 코드가 반환됩니다.

```http
HTTP/1.1 204 No Content
```

📌 **예제 2: DELETE 요청에 본문 포함 (비표준, 일부 서버에서만 가능)**

```http
DELETE /users/100 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "reason": "User requested account deletion"
}
```

👉 일부 서버에서는 본문을 허용할 수도 있지만, **대부분의 RESTful API에서는 DELETE 요청에 본문을 사용하지 않습니다.**

✅ **결론:**

- DELETE 요청에서는 보통 **본문을 포함하지 않고**, URL을 통해 리소스를 지정합니다.
- 일부 서버는 본문을 허용하지만, **일반적인 RESTful API 설계에서는 사용되지 않습니다.**

---

### **5️⃣ HTTP 상태 코드 201과 204의 차이점은 무엇인가요?**

✅ **201 Created** → 새로운 리소스가 생성되었을 때 사용됩니다.  
✅ **204 No Content** → 요청이 성공했지만, 응답 본문이 없을 때 사용됩니다.

📌 **예제 1: 새로운 리소스를 생성했을 때 (201 Created)**

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

👉 **새로운 사용자가 생성되면 서버는 201 상태 코드를 반환합니다.**

```http
HTTP/1.1 201 Created
Location: /users/100
```

📌 **예제 2: 데이터를 삭제했을 때 (204 No Content)**

```http
DELETE /users/100 HTTP/1.1
Host: example.com
```

👉 **사용자가 삭제되었지만, 추가적인 응답 데이터가 필요하지 않을 경우 204 상태 코드를 반환합니다.**

```http
HTTP/1.1 204 No Content
```

✅ **결론:**

- **201 Created**는 새로운 리소스가 성공적으로 생성되었음을 나타냅니다.
- **204 No Content**는 요청이 성공적으로 처리되었지만, 응답 본문이 필요하지 않을 때 사용됩니다.
- **POST 요청의 성공 응답은 보통 `201 Created`**, **DELETE 요청의 성공 응답은 `204 No Content`**를 사용합니다.

---
