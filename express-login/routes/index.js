var express = require('express');
var router = express.Router();
var connectFlash = require('express-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members'});
});

module.exports = router;
