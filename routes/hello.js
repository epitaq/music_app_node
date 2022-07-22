var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('hello', { title: 'Hello World!', text: 'This is a sample page.' });
});

module.exports = router;
