var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
var jwt = require('../utils/jwt')
const { success, fail, uuid } = require('../utils/index');
const { literal, Op, Sequelize } = require("sequelize");
const initModels = require('./../models/init-models')
const coon = require('../utils/sequelize')
const { User } = initModels(coon)

// User.belongsTo(User, {foreignKey: 'userId', sourceKey: 'id'});

/* 登录 */
router.post('/login', async (req, response, next) => {
    const { name, password } = req.body
    try {
        const data = await User.findOne({ where: { name } });
        if (data) {
            const login = await User.findOne({ where: { name, password: md5(password) } });
            if (login) {
                const token = jwt.createToken({ name });
                response.send(success({
                    ...login.get(), token
                }))
            } else {
                response.send(fail('账号或者密码错误'))
            }
        } else {
            response.send(fail('账号未注册'))
        }
    } catch (error) {
        response.send(fail(error))
    }
});

/* 分页查询 */
router.post('/user/list', async (req, response, next) => {
    const { nickName, pageSize, pageNum } = req.body
    try {
        let data = await User.findAndCountAll({
            where: {
                nickName: {
                    [Op.like]: `%${nickName || ''}%`
                },
            },
            order: [['createTime', 'desc']],
            limit: pageSize || 10,
            offset: ((pageNum || 1) - 1) * (pageSize || 10),
            // include: [{model: User}] //用这个不能设置raw:true
        });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 获取详情 */
router.post('/user/detail', async (req, response, next) => {
    const { id } = req.body
    try {
        await User.update({
            views: literal("views + 1"), // readCount  : literal("read_count + 1"),  // 这里有个坑注意大小写
        }, { where: { id } });
        const data = await User.findOne({
            include: [{ model: User }], where: { id }
        });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 添加 */
router.post('/insert/user', async (req, response, next) => {
    const { title, content, userId, inputValue } = req.body
    try {
        const res = await User.create({ id: uuid(), title, content, userId, inputValue })
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});

// 批量添加
router.post('/insert/user/batch', async (req, response, next) => {
    const { } = req.body
    try {
        const res = await User.bulkCreate([])
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 编辑 */
router.post('/update/user', async (req, response, next) => {
    const { id, title, content, inputValue } = req.body
    try {
        const data = await User.update({ title, content, inputValue }, { where: { id } });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 删除 */
router.post('/del/user', async (req, response, next) => {
    const { id } = req.body
    try {
        const data = await User.update({ delFlag: 1 }, { where: { id } }); //软删除
        // const data = await User.destroy({ where: { id } }); //直接删除
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

// Sequelize.fn('NOW') //当前时间

module.exports = router;
