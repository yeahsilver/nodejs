const express = require('express');
const nunjucks  = require('nunjucks');

const admin = require('./routes/admin');
const contact = require('./routes/contact');

const app = express();
const port = 3000; // port 번호

nunjucks.configure('template',{
    autoescape: true, // html 태그 작동여부
    express: app // express 객체 설정
});

// url 추가
app.get('/', (req, res) =>{
    res.send('hello express');
});

app.use('/admin', admin);
app.use('/contact', contact);

// 웹서버 생성
app.listen(port, () => {
    console.log('express listening on port', port);
});