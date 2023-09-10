const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Menu', {
    id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    parId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "父级id"
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "菜单名称"
    },
    icon: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "图标"
    },
    path: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "路径"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "菜单name"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "排序"
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
    tableName: 'menu',
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
