'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type:DataTypes.STRING(100),
      allowNull:false
    },
    length: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Album",
        key: "id"
      }
    },
    audioUrl: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    lyrics: DataTypes.TEXT
  }, {});
  Song.associate = function(models) {
    Song.hasMany(models.Listen, {foreignKey: "songId"});
    Song.hasMany(models.PlaylistSongJoin, {foreignKey: "songId"});
    Song.hasMany(models.Like, {foreignKey: "songId"});
    Song.hasMany(models.Post, {foreignKey: "songId"});
    Song.belongsTo(models.Album, {foreignKey: "albumId"})
  };
  return Song;
};