'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"User",
        key: "id"
      }
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"User",
        key: "id"
      }
    },
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, {foreignKey: "userId"});
    Follow.belongsTo(models.User, {foreignKey: "artistId"});
  };
  return Follow;
};