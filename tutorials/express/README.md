# Npm Express

#### Express 시작

> 사용자는 요청하고, 서버는 응답한다.

- 사용자 -> 서버: Request (URL 접속, form 전송)
- 사용자 <- 서버: Response (텍스트, 이미지)



#### Npm을 통한 express 사용법

```js
npm init // json의 초기값 세틴
npm init -y // json의 정보 출력

npm install express // express 설치
npm install uuid4 
```

##### 주의) express를 설치할 때, package.json의 name이 "express"이면 설치 error 발생.



```js
const myVar = require('./myvar');
const uuid4 = require('uuid4');
console.log(uuid4()); // uuid4() 이러한 형태로 불러와야함.

// uuid4가 경로 지정을 하지 않은 이유) 경로지정을 하는 경우는 내 파일에서 가져올 경우! uuid4는 외부에서 가지고 오는 것이기에, 경로지정을 하지 않아도 상관 없음
```



### express

- lodash v3
- Body-parser



#### uuid4

- lodash v4



#### Script 사용

- package.json의 script 내부에 "단축어": "명령어" 형태로 단축어 설정

```js
"scripts": {
    "start": "node index.js"
  }
// 설정 후 npm start을 실행하게되면, npm node index.js 처럼 실행됨.
```



#### 내장모듈을 활용하여 웹서버 띄우기

```js
const http = require('http'); // http (내장 모듈) 불러오기

//서버 생성
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'}); // http 번호: 200번
    response.write('Hello Server'); // 출력 텍스트
    response.end();
}).listen(3000); //port번호: 3000번
```



#### http 상태코드

| 상태코드 | 설명                          |
| -------- | ----------------------------- |
| 1xx      | 조건부 응답                   |
| 2xx      | 응답 성공                     |
| 3xx      | 리다이렉션                    |
| 4xx      | 요청 오류 ( ex 404 Not Found) |
| 5xx      | 서버 오류                     |

