const express = require('express');
const router = express.Router();

function testMiddleWare( req, res, next){
    console.log('첫번째 미들웨어');
    next();
}

function testMiddleWare2( req, res, next){
    console.log('두번째 미들웨어');
    next();
}

function loginRequired(req, res, next){
    // 이런 형태로 만들어주면 됨.
    // if(로그인이 되어있지 않으면){
    //     res.redirect(로그인 창);
    // } else{
    //     next();
    // }
}

router.get('/', testMiddleWare, testMiddleWare2, (req, res) => {
    res.send('admin 이후 url');
}); // admin 이후의 사이트가 미들웨어 작업 처리됨.


router.get('/products', (req, res) => {
    // res.send('admin/products url');

    res.render('admin/products.html', {
        message: ` <h1>태그가 출력됩니다.</h1>`,
        online: 'express'
    }) // 템플릿 전송
});

module.exports = router;