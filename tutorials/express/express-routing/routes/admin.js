const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin 이후 url');
});

router.get('/products', (req, res) => {
    // res.send('admin/products url');
    res.render('admin/products.html', {
        message: ` <h1>태그가 출력됩니다.</h1>`,
        online: 'express'
    }) // 템플릿 전송
});

module.exports = router;