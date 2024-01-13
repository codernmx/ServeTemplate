const log4js = require ('log4js')
const jwt = require ('../utils/jwt')

//日志
const logger = (name) => {
	log4js.configure ({
		appenders: {
			out: { type: 'console' }, //在控制台输出日志
			cheese: {
				type: 'file',
				filename: 'logs/log',
				pattern: 'yyyy-MM-dd.log',
				maxLogSize: 1024 * 1000 * 10 //10M
			}
		},
		categories: {
			//需要在控制台输出日志时：appenders: ['cheese', 'out']
			default: { appenders: ['cheese', 'out'], level: log4js.levels.DEBUG }
		}
	})
	return log4js.getLogger (name)
}

//添加日志
const addFormatLog = function (req, res, data) {
	const now = new Date ()
	const resTime = now - req._startTime
	let resTimeLevel = '01'
	if ( resTime > 5000 ) {
		resTimeLevel = '50'
	} else if ( resTime > 2000 ) {
		resTimeLevel = '20'
	} else if ( resTime > 1000 ) {
		resTimeLevel = '10'
	} else if ( resTime > 500 ) {
		resTimeLevel = '05'
	} else if ( resTime > 300 ) {
		resTimeLevel = '03'
	} else if ( resTime > 200 ) {
		resTimeLevel = '02'
	} else if ( resTime > 100 ) {
		resTimeLevel = '01'
	} else {
		resTimeLevel = '00'
	}
	const user = jwt.verifyToken (req.headers.token)
	const {
		ip,
		headers,
		method,
		url,
		body,
		httpVersion,
		res: { statusCode, _header }
	} = req
	let logInfo = {
		ip,
		host: headers.host,
		resTime,
		resTimeLevel,
		method,
		url,
		user,
		body,
		httpVersion,
		statusCode,
		contentLength: _header['content-length'],
		userAgent: headers['user-agent'],
		// data: data[0]
	}
	logger ('log').info (`${JSON.stringify (logInfo)}`)
}

//日志中间件
const log4MiddleWare = () => {
	return function (req, res, next) {
		req._startTime = new Date ()
		const oldSend = res.send
		res.send = function () {
			oldSend.apply (res, arguments)
			if ( typeof [...arguments][0] === 'object' ) {
				res.once ('finish', () => addFormatLog (req, res, arguments))
			}
		}
		return next ()
	}
}


module.exports = {
	log4MiddleWare,
	logger
}