const models = require('../../models');

exports.get_products = ( _ , res) => {
    // res.render( 'admin/products.html' , 
    //     { message : "hello" } // message 란 변수를 템플릿으로 내보낸다.
    // );

    models.Products.findAll({

    }).then( (products) => {
        res.render('admin/products.html', {products})
    });
}

exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}

exports.post_products_write = ( req , res ) => {
    // res.send(req.body);
    // models에 있는 products 테이블ㄹ에 데이터 생성
    // models.Products.create({
    //     name: req.body.name,
    //     price: req.body.price,
    //     description: req.body.description
    // }).then( () => { // callback

    //     res.redirect('/admin/products');
    // });
    models.Products.create(req.body).then(() => {
        res.redirect('/admin/products');
    }) // 위의 주석과 같은 형태
}