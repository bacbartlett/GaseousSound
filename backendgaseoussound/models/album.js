'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"User",
        key: "id"
      }
    },
    artworkUrl: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Genre",
        key: "id"
      }
    }
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, {foreignKey: "userId"});
    Album.hasMany(models.Song, {foreignKey: "albumId"});
    Album.hasMany(models.Post, {foreignKey: "albumId"});
    Album.belongsTo(models.Genre, {foreignKey: "genreId"})
  };
  return Album;
};