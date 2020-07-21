const express = require('express');
const app = express();
const port = 3000; // port 번호

// url 추가
app.get('/', (req, res) =>{
    res.send('hello express');
});

app.get('/express2', (req, res) =>{
    res.send('express2 get');
});

// 웹서버 생성
app.listen(port, () => {
    console.log('express listening on port', port);
});