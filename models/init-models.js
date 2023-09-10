var DataTypes = require("sequelize").DataTypes;
var _Article = require("./article");
var _Menu = require("./menu");
var _User = require("./user");

function initModels(sequelize) {
  var Article = _Article(sequelize, DataTypes);
  var Menu = _Menu(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    Article,
    Menu,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
