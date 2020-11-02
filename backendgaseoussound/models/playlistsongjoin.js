'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistSongJoin = sequelize.define('PlaylistSongJoin', {
    songId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Song",
        key: "id"
      }
    },
    playlistId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Playlist",
        key: "id"
      }
    }
  }, {});
  PlaylistSongJoin.associate = function(models) {
    PlaylistSongJoin.belongsTo(models.Song, {foreignKey: "songId"});
    PlaylistSongJoin.belongsTo(models.Playlist, {foreignKey: "playlistId"})
  };
  return PlaylistSongJoin;
};