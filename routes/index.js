var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
var jwt = require('../utils/jwt')

const {success, fail, uuid} = require('../utils/index');

const {literal, Op, Sequelize} = require("sequelize");

const initModels = require('./../models/init-models')
const coon = require('../utils/sequelize')
const {Article, User} = initModels(coon)



// belongsTo 谁属于一个谁 例：一本书属于一个人
Article.belongsTo(User, {foreignKey: 'userId', sourceKey: 'id'});
// hasOne 谁拥有一个谁  例：一个人拥有一本书
// User.hasOne(Article, { foreignKey: 'userId', sourceKey: 'id' });




/* 登录 */
router.post('/login', async (req, response, next) => {
    const {name, password} = req.body
    try {
        const data = await User.findOne({where: {name}});
        if (data) {
            const login = await User.findOne({where: {name, password: md5(password)}});
            if (login) {
                const token = jwt.createToken({name});
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
router.post('/article/list', async (req, response, next) => {
    const {title, pageSize, pageNum} = req.body
    try {
        let data = await Article.findAndCountAll({
            where: {
                title: {
                    [Op.like]: `%${title || ''}%`
                },
            },
            order: [['createTime', 'desc']],
            limit: pageSize || 10,
            offset: ((pageNum || 1) - 1) * (pageSize || 10),
            include: [{model: User}]
        });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 获取详情 */
router.post('/article/details', async (req, response, next) => {
    const {id} = req.body
    try {
        await Article.update({
            views: literal("views + 1"), // readCount  : literal("read_count + 1"),  // 这里有个坑注意大小写
        }, {where: {id}});
        const data = await Article.findOne({
            include: [{model: User}], where: {id}
        });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 添加 */
router.post('/insert/article', async (req, response, next) => {
    const {title, content, userId, inputValue} = req.body
    try {
        const res = await Article.create({id: uuid(), title, content, userId, inputValue})
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});

// 批量添加
router.post('/insert/article/batch', async (req, response, next) => {
    const {} = req.body
    try {
        const res = await Article.bulkCreate([])
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 编辑 */
router.post('/update/article', async (req, response, next) => {
    const {id, title, content, inputValue} = req.body
    try {
        const data = await Article.update({title, content, inputValue}, {where: {id}});
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 删除 */
router.post('/delete/article', async (req, response, next) => {
    const {id} = req.body
    try {
        const data = await Article.update({deleteTime: Sequelize.fn('NOW')}, {where: {id}}); //软删除
        // const data = await Article.destroy({ where: { id } }); //直接删除
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


module.exports = router;
