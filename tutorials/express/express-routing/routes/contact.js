const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('contact.js');
});


router.get('/list', (req, res) => {
    res.send('contact/list.js');
});

module.exports = router;