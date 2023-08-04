/*
 * @Date: 2023-08-04 15:02:49
 * @LastEditTime: 2023-08-04 15:08:02
 */
const { v4: uuidv4 } = require('uuid');


//code  生成附件名称（随机字符串）
function randomChar (length) {
	var str = '0123456789'
	var result = ''
	for (var i = length; i > 0; --i)
		result += str[Math.floor(Math.random() * str.length)]
	return result
}

//成功返回参数
function success (data) {
	return {
		code: 200,
		data,
		msg: '成功',
		timestamp: new Date().getTime()
	}
}

// 返回格式 20230803152326
function formatTimeToYYYYMMDDHHMMSS () {
	const date = new Date()
	// 提取年、月、日、小时、分钟和秒
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const hours = ('0' + date.getHours()).slice(-2);
	const minutes = ('0' + date.getMinutes()).slice(-2);
	const seconds = ('0' + date.getSeconds()).slice(-2);
	// 格式化时间字符串
	const formattedTime = year + month + day + hours + minutes + seconds;
	return formattedTime;
}


//失败参数
function fail (msg) {
	return {
		code: 500,
		msg: msg.toString(),
		timestamp: new Date().getTime()
	}
}

// uuid

function uuid () {
	return uuidv4().replace(/-/g, '')
}

module.exports = {
	success,
	fail,
	randomChar,
	uuid,
	formatTimeToYYYYMMDDHHMMSS
}