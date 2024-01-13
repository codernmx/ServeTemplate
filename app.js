/*
 * @Date: 2023-08-04 15:02:49
 * @LastEditTime: 2023-12-18 14:04:30
 */
const express = require ('express');
const path = require ('path');
const mysql_test = require ('./utils/sequelize')

const Index = require ('./routes/index');
const Upload = require ('./routes/upload');
const jwt = require ('./utils/jwt')

const { log4MiddleWare } = require ('./utils/log4')

const app = express ();

app.use (log4MiddleWare ()) //log4js 中间件

app.use (express.json ({ limit: '200mb' })) //修改请求参数限制
app.use (express.urlencoded ({ extended: false }));
app.use (express.static (path.join (__dirname, 'public')));
app.use ('/upload', express.static (path.join (__dirname, '/upload'), {
	maxAge: 3600000, //设置可缓存文件
}));
/* 跨域 */
app.all ('*', function (req, res, next) {
	res.header ("Access-Control-Allow-Origin", "*");
	res.header ('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header ("Access-Control-Allow-Headers", "X-Requested-With");
	res.header ('Access-Control-Allow-Headers', ['token', 'Content-Type']);
	next ();
});

/* 所有请求都过token校验 */
app.use (function (req, res, next) {
	let passUrl = [
		'/api/login',
	]
	if ( !passUrl.includes (req.path) ) {
		let token = req.headers.token;
		let result = jwt.verifyToken (token);
		if ( result.code === 500 ) {
			res.send ({
				code: 401,
				msg: '权限验证失败~',
				timestamp: new Date ().getTime (),
				path: req.path
			});
		} else {
			next ();
		}
	} else {
		next ();
	}
});

app.use ('/api', Index);
app.use ('/api/upload', Upload);


mysql_test.authenticate ()  //用来测试数据库是否连接成功
	.then (() => {
		console.log ('数据库连接成功')
	}).catch ((err) => {
	console.log ('数据库连接失败:' + err)
})

app.use (function (req, res, next) {
	res.send ({
		msg: 'NOT FOUND',
		code: 404,
		path: req.path
	})
});

module.exports = app;
