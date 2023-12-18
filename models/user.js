const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.STRING(33),
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "用户名"
    },
    password: {
      type: DataTypes.STRING(33),
      allowNull: true,
      comment: "密码"
    },
    nickName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "昵称"
    },
    avatar: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "头像"
    },
    userType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "用户类型：1普通用户 2后台管理员"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "是否停用：0正常，1禁用"
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "更新时间"
    },
    delFlag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除 0 否 1是"
    },
    loginNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "登录次数"
    },
    lastLoginTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "最后登录时间"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
