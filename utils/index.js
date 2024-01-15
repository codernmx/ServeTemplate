/*
 * @Date: 2023-08-04 15:02:49
 * @LastEditTime: 2024-01-15 14:57:58
 */
const fs = require('fs');
const axios = require('axios');
const { WEAPP_APP_ID, WEAPP_APP_SECRET } = require('../config/index');
const FILE_PATH = './access_token.json';
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





async function getAccessToken () {
	let accessTokenData = {};
	try {
		accessTokenData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));// 读取本地文件
	} catch (error) {
		accessTokenData = await fetchNewAccessToken();// 文件不存在或者解析失败，则重新获取 ACCESS_TOKEN
	}
	const { timestamp, access_token } = accessTokenData;
	const isExpired = new Date().getTime() - timestamp >= 1000 * 60 * 110;
	if (isExpired || !access_token) {// 判断 ACCESS_TOKEN 是否过期 110分钟后重新获取
		accessTokenData = await fetchNewAccessToken();
	}
	fs.writeFileSync(FILE_PATH, JSON.stringify(accessTokenData));// 存储到本地文件
	return accessTokenData.access_token;
}

async function fetchNewAccessToken () {
	const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WEAPP_APP_ID}&secret=${WEAPP_APP_SECRET}`;
	try {
		const response = await axios.get(url);
		const { access_token } = response.data;
		console.log('我是新获取的~~~~~~~', JSON.stringify(response.data))
		if (!access_token) {
			console.log('获取access_token 失败~', JSON.stringify(response.data));
		}
		return {
			access_token,
			timestamp: new Date().getTime(),
		};
	} catch (error) {
		throw new Error('获取 ACCESS_TOKEN 失败');
	}
}


module.exports = {
	success,
	fail,
	randomChar,
	uuid,
	formatTimeToYYYYMMDDHHMMSS,
	getAccessToken
}