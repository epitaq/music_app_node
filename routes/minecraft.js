var express = require('express');
var router = express.Router();

router.get('/download', (req, res) => {
  res.download('zip/resources.zip')
})



