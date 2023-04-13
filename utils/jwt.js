// 引入模块依赖
const jwt = require('jsonwebtoken');
let key = "fuTkisMQQ2j1ESC0cbaQen1ZWmkMdvLx"
let expiresIn = 60 * 60 * 12 //12H(token过期的时间)

//生成token
const createToken = function (info) {
    let token = jwt.sign(info, key, { expiresIn });
    return token;
}
// 校验token(错误会抛出异常)
const verifyToken = function (token) {
    try {
        let info = jwt.verify(token, key)
        return {
            code: 200,
            msg: '校验成功',
            ...info,
        }
    } catch {
        return {
            code: 500,
            msg: '校验失败'
        }
    }
}
module.exports = {
    verifyToken,
    createToken
};