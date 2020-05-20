var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const config = require('../sql_config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
});

var Person = sequelize.define('persons', {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		autoIncrement: true,
	},
	name: Sequelize.STRING(255),
	age: Sequelize.INTEGER(11),
	sex: Sequelize.STRING(255)
}, {
	timestamps: false
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.query);

	var params = {};

	for(var key in req.query){
		if(req.query[key]) {
			params[key] = {
				$like:'%' + req.query[key] + '%'
			};
		}
	}

	Person.findAll({
		where: params
	}).then(function(data){
		var result = [];
		data.forEach(function(item){
			result.push(item.dataValues);
		});
		res.send(JSON.stringify(result));
	})
});

router.post('/', function(req, res, next) {
	Person.create(req.body).then(function (p) {
		res.send({message:"添加成功"});
	}).catch(function (err) {
		res.sendStatus(400).send({error:'添加失败: ' + err});
	})
});

module.exports = router;
