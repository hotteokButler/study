# 2. URI와 웹 브라우저 요청 흐름

<aside>

### URI - 자원의 식별자

<aside>

### URL(Resource Locator)

- 리소스가 있는 위치를 지정
- 위치는 변할 수 있음
</aside>

<aside>

### URN(Resource Name)

- 리소스에 이름을 부여
- 이름은 변하지 않음
- URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되어 있지 X
</aside>

</aside>

# 1. URI(Uniform Resource Identifier)

- URI는 URL과 URN을 포함하고 있다.
- 통합 자원 식별자(Uniform Resource Identifier)는 인터넷에 있는 자원이 어디에 있는지 자원 자체를 식별하는 방법
  - Uniform :리소스 식별하는 통일된 방식
  - Resource : 자원, URI로 식별할 수 있는 모든 것(제한 없음) ex. html file, 실시간 정보 등 구분 가능한 것은 무엇이든
  - Identifier : 다른 항목과 구분하는데 필요한 정보

# 2. URL(Uniform Resource Locator)

- 파일식별자(Uniform Resource Locator)는 네트워크 상에서 자원이 어디 있는지 위치를 알려주기 위한 규약
- 컴퓨터 네트워크와 검색 메커니즘에서 위치를 지정하는, 웹 리소스에 대한 참조
- URL을 웹 사이트 주소로 알고 있지만, 컴퓨터 네트워크상의 자원을 모두 나타내는 표기법임

## 2-1. 구성

<aside>

scheme://[userinfo@]host[:port][/path][?query][#fragment]

</aside>

<aside>

https://www.google.com:443/search?q=hello&hl=ko

</aside>

✔︎프로토콜 : https

✔︎호스트명 : www.google.com

✔︎포트번호 : 443

✔︎패스 : /search

✔︎쿼리 파라미터 : q=hello&hl=ko

### 1)scheme

<aside>

`https`<small>://www.google.com:443/search?q=hello&hl=ko</small>

</aside>

- 주로 프로토콜(어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙) 사용
- http → 80포트, https → 443포트를 주로 사용하며 포트는 생략 가능

### 2)userinfo

<aside>

<small>ftp://</small>`user:password@`<small>ftp.example.com:2025</small>

</aside>

- URL에 사용자 정보를 포함해서 인증
- 요즘은 거의 사용 X

### 3)host

<aside>

<small>https://</small>`www.google.com`<small>:443/search?q=hello&hl=ko</small>

</aside>

- 호스트명
- 도메인명 또는 IP 주소를 직접 사용 가능

### 4)port

<aside>

<small>https://www.google.com</small>`:443`<small>/search?q=hello&hl=ko</small>

</aside>

- 접속 포트
- 일반적으로 생략 가능
  - 특정 서버에 따로 접근해야 할 경우는 표기
- http →80, https→443, 톰캣 → 8080

### 5)path

<aside>

<small>https://www.google.com:443</small>`/search`<small>?q=hello&hl=ko</small>

</aside>

- 리소스 경로(path)
- 계층적 구조 → 설계시 계층적으로 해야함
  - /home/file1.jpg
  - /members
  - /members/100
  - /items/iphone13

### 6)query

<aside>

<small>https://www.google.com:443/search</small>`?q=hello&hl=ko`

</aside>

- key=value 형태
- ?로 시작하며, &로 추가 가능
  - ?keyA=valueA&keyB=valueB
- query parameter, query string 등으로 불림
- 웹서버에 제공하는 파라미터
  - string type로 전달 됨

### 7)fragment

<aside>

<small>https://example.com/docs/?search=recipe</small>`#index01`

</aside>

- html 내부 북마크 등에 사용
- 웹 문서 해시태그
- 서버에 전송하는 정보 아님

## 2-2.URL의 웹 브라우저의 요청 흐름

1. DNS 서버를 조회해서 IP와 포트 정보를 받는다
2. 정보를 토대로 HTTP 요청 메시지를 생성한다
3. 서버에 HTTP 메시지를 전송한다
   1. 웹브라우저의 soket lib 이용해서 TCP/IP 커넥션 연결 요청
   2. 이전단계에서 찾은 IP와 PORT정보를 가지고 3 way handshake(SYN → SYN + ACK → ACK)을 통해 서버와 연결
   3. 연결이 성공 시 TCP/IP 4계층으로 데이터 전달
   4. HTTP 메시지를 포함한 TCP/IP 패킷 생성 후 서버로 전송
4. 서버는 패킷을 받으면 TCP/IP 패킷을 열어 HTTP 메시지를 가지고 해석
5. html 데이터를 포함한 응답 메시지를 만들어서 클라이언트에 반환
6. 클라이언트에서는 응답메시지를 받아 화면에 렌더링

# 3. URN(Uniform Resource Name)

- 통합 자원 이름(Uniform Resoruce Name)은 `urn:scheme` 을 사용하는 URI를 위한 역사적인 이름
- 리소스에 이름 부여, 유일하게 식별할 수 있는 URI
- 영속적, 위치에 독립적인 자원을 위한 지시자로 사용하기 위해 1997년도 RFC 2141 문서에서 정의되었다.
- 리소스가 이름에 매핑되어 있어야 하기 때문에 이름으로 부여하면 거의 찾기 힘들다. 대부분 URL만 쓴다.
  - 리소스 접근방법과, 웹 상의 위치가 표기되지 않는다.

> 참고
>
> [https://inpa.tistory.com/entry/WEB-🌐-URL-URI-차이](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-URL-URI-%EC%B0%A8%EC%9D%B4)
>
> [https://inpa.tistory.com/entry/WEB-🌐-URL-구성-요소-요청-흐름-정리](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-URL-%EA%B5%AC%EC%84%B1-%EC%9A%94%EC%86%8C-%EC%9A%94%EC%B2%AD-%ED%9D%90%EB%A6%84-%EC%A0%95%EB%A6%AC)
>
> [https://velog.io/@ss-won/네트워크-URI-URL-URN](https://velog.io/@ss-won/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-URI-URL-URN)
>
> [https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/network/uri.md](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/network/uri.md)
>
> [https://velog.io/@wlwl99/URL와-URI-IP와-PORT-도메인과-DNS#urluniform-resource-locator](https://velog.io/@wlwl99/URL%EC%99%80-URI-IP%EC%99%80-PORT-%EB%8F%84%EB%A9%94%EC%9D%B8%EA%B3%BC-DNS#urluniform-resource-locator)
