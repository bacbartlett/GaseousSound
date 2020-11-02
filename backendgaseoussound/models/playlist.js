'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"User",
        key: "id"
      }
    },
    title: {
      type:DataTypes.STRING(100),
      allowNull:false
    },
    public: {
      type:DataTypes.BOOLEAN, 
      allowNull:false
    }
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, {foreignKey: "userId"});
    Playlist.hasMany(models.PlaylistSongJoin, {foreignKey: "playlistId"});
    Playlist.hasMany(models.Post, {foreignKey: "playlistId"})
  };
  return Playlist;
};