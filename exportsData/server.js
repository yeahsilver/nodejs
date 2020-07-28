let express = require('express');
let server = express();
let upload = require('express-fileupload');
let importExcel = require('convert-excel-to-json');
let del = require('del');

server.use(upload());

server.get('/',(req, res) => {
	res.sendFile(__dirname+'/index.html');
})

server.post('/', (req, res) => {
	let file = req.files.filename;
	let filename = file.name;
	let arr = [];
	file.mv('./excel/'+filename,(err) => {
		if(err){
			res.send('err');
		}else {
			let result = importExcel({
				sourceFile : './excel/'+filename,
				header: {rows:1},
				columnToKey:{A: 'id', B: 'name', C : 'password', D:'deptName', E : 'role'},
				sheets : ['Sheet1']
			});
			for(var i = 0; result.Sheet1.length > i; i++){
				arr.push(result.Sheet1[i]); 
			}
			res.send(arr);
			del(['excel/'+filename]).then(paths=>{console.log('file '+ filename)});
		}
	});
});

server.listen(3000, () => {console.log('server di 3000')});

