const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Article', {
    id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    userId: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "用户id"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "标题"
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "浏览量"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "输入内容html"
    },
    inputValue: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "输入内容"
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
    deleteTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "删除时间"
    }
  }, {
    sequelize,
    tableName: 'article',
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
