var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('["success",2]');
});


router.get('/login', function(req, res, next) {
  res.send('["success",2]');
});

module.exports = router;
