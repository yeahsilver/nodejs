const express = require('express');
const nunjucks  = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

const admin = require('./routes/admin');
const contact = require('./routes/contact');

const app = express();
const port = 3000; // port 번호

nunjucks.configure('template',{
    autoescape: true, // html 태그 작동여부
    express: app // express 객체 설정
});

// 미들웨어 세팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    app.locals.isLogin = true;
    next();
});

// url 추가
app.get('/', (req, res) =>{
    res.send('hello express');
});

function vipMiddleware(req, res, next){
    console.log("최우선 미들웨어");
    next();
}

// routing
app.use('/admin', vipMiddleware, admin);
app.use('/contact', contact);

// 404
app.use( (req, res, _ ) => {
    res.status(404).render('common/404.html');
});

// 500
app.use((err, req, _ ) => {
    res.status(500).render('common/500.html');
});

// 웹서버 생성
app.listen(port, () => {
    console.log('express listening on port', port);
});