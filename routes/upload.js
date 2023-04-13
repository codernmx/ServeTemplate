
var express = require('express');
var router = express.Router();
var fs = require('fs'); //文件
var multer = require('multer');   //上传文件中间件
var moment = require('silly-datetime'); //格式化时间
var path = require('path');
const { randomChar } = require('../utils/index')
const { fileUrl } = require('../config/index')

var createFolder = function (folder) {
	try {
		fs.accessSync(folder);
	} catch (e) {
		fs.mkdirSync(folder);
	}
};
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const time = new Date().getFullYear()
		var uploadFolder = './upload/' + time;
		createFolder(uploadFolder);
		cb(null, 'upload/' + time);
	},
	filename: function (req, file, cb) {
		cb(null, moment.format(new Date(), 'YYYYMMDD') + randomChar(6) + file.originalname.substring(file.originalname.lastIndexOf(".")));
	}
});
router.post('/file', multer({ storage }).single('file'), function (req, response, next) {
	const file = req.file;
	// let fullPath = (path.resolve(__dirname, '..') + '\\' + file.path).replace(/\\/g, '/')
	const { originalname } = file
	// const suffix = originalname.substring(originalname.lastIndexOf("."))
	response.send({
		// oldName: originalname,
		// suffix,
		// path: file.path.replace(/\\/g, '/'),
		// fullPath,
		url: fileUrl + file.path.replace(/\\/g, '/')
	})
});



module.exports = router;
