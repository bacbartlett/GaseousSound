'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
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
  Like.associate = function(models) {
    Like.belongsTo(models.User, {foreignKey: "userId"});
    Like.belongsTo(models.Song, {foreignKey: "songId"});
  };
  return Like;
};