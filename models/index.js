const coon = require('../utils/sequelize')
const { Sequelize } = require("sequelize");


const User = require('./user')(coon, Sequelize)
const Article = require('./article')(coon, Sequelize)
const Menu = require('./menu')(coon, Sequelize)

module.exports = {
    User, Article, Menu
};
