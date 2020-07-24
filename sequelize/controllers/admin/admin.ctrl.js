const models = require('../../models');

exports.get_products = ( _ , res) => {
    // res.render( 'admin/products.html' , 
    //     { message : "hello" } // message 란 변수를 템플릿으로 내보낸다.
    // );
    models.Products.findAll({

    }).then( (products) => {
        // DB에서 받은 products를 products 변수명으로 내보냄
        res.render( 'admin/products.html' ,{ products : products });
    });
}

exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}

exports.post_products_write = ( req , res ) => {
    models.Products.create({
        name : req.body.name,
        price : req.body.price ,
        description : req.body.description
    }).then( () => {
        res.redirect('/admin/products');
    });
}

exports.get_products_detail = ( req , res ) => {
    models.Products.findByPk(req.params.id).then( (product) => {
        res.render('admin/detail.html', { product: product });
    });
}

exports.get_products_edit = ( req, res ) => {
    models.Products.findByPk(req.params.id).then( ( product ) => {
        res.render( 'admin/write.html' , { product });
    });
}

exports.post_products_edit = ( req, res ) => {
    models.Products.update({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    },{
        where : { id : req.params.id }
    }).then(()=> {
        res.redirect('/admin/products/detail/' + req.params.id );
    })
};