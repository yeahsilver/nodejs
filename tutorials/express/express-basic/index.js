const http = require('http'); // http (내장 모듈) 불러오기

//서버 생성
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'}); // http 번호: 200번, text/plain: 문서의 타입을 지정
    response.write('Hello Server'); // 출력 텍스트
    response.end();
}).listen(3000); //port번호: 3000번