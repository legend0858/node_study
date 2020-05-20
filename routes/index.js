var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'node_express初体验',
		xss: req.query.xss
	});
});

router.get('/person', function(req, res, next){
	console.log("person 日志打印");
});

module.exports = router;
