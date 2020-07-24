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

- sequalizer 설치

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

