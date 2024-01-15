const os = require ('os')


// 获取本机ip地址
const getIpAddress = function () {
	let Interfaces = os.networkInterfaces ()
	for (let dev in Interfaces) {
		let iface = Interfaces[dev]
		for (let i = 0; i < iface.length; i ++) {
			let { family, address, internal } = iface[i]
			if ( family === 'IPv4' && address !== '127.0.0.1' && !internal ) {
				return address
			}
		}
	}
}




module.exports = {
	getIpAddress,
}