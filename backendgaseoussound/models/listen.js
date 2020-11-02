'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listen = sequelize.define('Listen', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"User",
        key: "id"
      }
    },
    songId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Song",
        key: "id"
      }
    }
  }, {});
  Listen.associate = function(models) {
    Listen.belongsTo(models.User, {foreignKey: "userId"});
    Listen.belongsTo(models.Song, {foreignKey: "songId"});
  };
  return Listen;
};