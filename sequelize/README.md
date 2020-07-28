# sequelize

#### app.js에 연결

```js
//.env

// app.js
process.env.DB_USER
```



#### Database 생성

```mysql
mysql -u root -p

create database exerices; // 데이터베이스 생성

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '루트 비밀번호";// 시퀄라이저 설정
```



#### DB 접속 (MySql)

- sequalize 설치

```
npm install --save sequelize
npm install -- save mysql
npm install sequelize@4.42.0
```

```js
// .env
DATABASE = "exercise"
DB_USER = "root"
DB_PASSWORD = "19981231"
DB_HOST = "localhost"
```



```js
// index.js
var dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

/*
	process.env.DATABASE: 데이터베이스 이름 가져오기 (여기에서는 exercise)
	process.env.DB_USER: 데이터베이스 사용자 가져오기 (여기에서는 root)
	process.env.DB_PASSWORD: 데이터베이스 비밀번호 가져오기 (여기에서는 19981231)
	process.env.DB_HOST: 데이터베이스 호스트 가져오기 (여기에서는 localhost)
*/
const sequelize = new Sequelize( process.env.DATABASE, 
 process.env.DB_USER, process.env.DB_PASSWORD,{
     host: process.env.DB_HOST,
     dialect: 'mysql',
     timezone: '+09:00', //한국 시간 셋팅
     operatorsAliases: Sequelize.Op,
     pool: {
         max: 5,
         min: 0,
         idle: 10000
     }
 });

 fs.readdirSync(__dirname)
     .filter(file => {
   				// index.js를 제외하고 
         return file.indexOf('.js')&& file !== 'index.js'
     })
     .forEach(file => {
         var model = sequelize.import(path.join(__dirname,
             file));
             db[model.name] = model;
     }); // 각각에 있는 파일들을 참조해서 테이블들을 생성
```



#### DB 모델 작성

```js
// products.js
// 데이터베이스 정의
module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('products',{
        id: {type: DataTypes.INTEGER, primarykey: true, autoIncrement: true },
        name: {type: DataTypes.STRING},
        price: {type: DataTypes.INTEGER },
        description : {type: DataTypes.TEXT }
    });
    return Products;
}
```

```js
// app.js
// 데이터베이스와 sync 맞추기
dbConnection(){
        // DB authentication
        db.sequelize.authenticate()
        .then(() => {
            // DB 접속이 성공하면
            console.log('Connection has been established successfully.');
        })
        .then(() => {
            // 위치에 맞게 DB 생성
            console.log('DB Sync complete');
            db.sequelize.sync(); // 이 부분!
        })
        .catch( err => {
            console.error('Unable to connect to the database', err);
        });
    }
```



#### DB 입력

```js
// controller/admin/index.js
// 데이터를 데이터베이스에 POST하는 역할!
router.post('/products/write', ctrl.post_products_write );


```

```js
// admin.ctrl.js
exports.post_products_write = ( req , res ) => {
    // res.send(req.body);
    // models에 있는 products 테이블ㄹ에 데이터 생성
    models.Products.create({
       // 각각에 저장
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }).then(() => { // callback
        
        res.redirect('/admin/products');
    });
}

//admin.ctrl.js를 아래와 같이 사용해도 같은 결과 출력
 models.Products.create(req.body).then(() => {
        res.redirect('/admin/products');
    })
```



#### DB 조회

```js
// admin.ctrl.js
exports.get_products = ( _ , res) => {
    // res.render( 'admin/products.html' , 
    //     { message : "hello" } // message 란 변수를 템플릿으로 내보낸다.
    // );

    models.Products.findAll({

    }).then((productList) => {
        res.render('admin/products.html', {productList: productList})
    });
}
```

```js
// products.html
// 키 값고 value값이 같으면 products:products 대신 products만 써도 됨.
}).then( (products) => {
        res.render('admin/products.html', {products})
    });
```



#### 상세페이지 작성

```html
<!-- product.js -->
<td> 
                <a href = "/admin/products/detail/{{ product.id }}">
                    {{ product.name }} 
                </a> 
            </td> 
```

```js
// admin/index.js
router.get('/product/write/:id', ctrl.get_products_detail);
```

```js
// admin_ctrl.js
// detail.html 연결
exports.get_products_detail = (req, res) => {
    //req.params.id;
    models.Products.findByPk(req.params.id).then((product) =>{
        res.render('admin/detail.html', {product});
})
```



#### moment.js

- 함수 추가의 형태로 이루어짐.
- 데이터의 형식을 변경시켜줌.

```js
// Products.js
// 데이터 형식 변경
Products.prototype.dateFormat = (date) => (
	moment(date).format('YYYY-MM-DD')
);
```



#### DB 수정

```js
// admin.ctrl.js
// 아이디에 맞게 수정창으로 이동하기
exports.get_products_edit = ( req, res ) => {
    models.Products.findByPk(req.params.id).then( ( product ) => {
        res.render( 'admin/write.html' , { product });
    });
}

// 수정한 내용을 post
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
```

```js
// admin/index.js
router.get('/products/edit/:id', ctrl.get_products_edit );
router.post('/products/edit/:id', ctrl.post_products_edit );
```

```html
<!-- write.html -->
<tr>
   <th>제품명</th>
   		<td>
        <!-- value에 값을 넣어줌 -->
        <input type="text" name="name" class="form-control" value = "{{ product.name }}"/> 
  		</td>
</tr>
```



#### DB 삭제

```js
// admin/index.js
router.get('/products/delete/:id', ctrl.get_products_delete );
```

```js
// admin.ctrl.js
exports.get_products_delete = ( req, res ) => {
    models.Products.destroy({
        where : {
            id : req.params.id
        }
    }).then(() => {
        res.redirect('/admin/products');
    })
}
```

```html
<!-- products.html -->
<a href="/admin/products/delete/{{ product.id }}" class="btn btn-danger" onclick="return confirm('삭제하시겠습니까?')">삭제</a>
```





#### CRUD

> select, insert, update, delete

```js
models.테이블명.create(데이터) // 테이블 생성
models.테이블명.findAll(조회조건) // 데이터 전체 검색
models.테이블명.findByPk(primary key) // 데이터 일부 검색
models.테이블명.findOne(조회조건) // 데이터 한개 검색

models.테이블명.update(데이터, 조회조건) // 데이터 업데이트

models.테이블명.destroy(조회조건) // 데이터 제거
```

