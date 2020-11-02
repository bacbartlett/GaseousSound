'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type:DataTypes.STRING(500),
    },
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
    },
    albumId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Album",
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
  Post.associate = function(models) {
    Post.belongsTo(models.User, {foreignKey: "userId"});
    Post.belongsTo(models.Album, {foreignKey: "albumId"})
    Post.belongsTo(models.Song, {foreignKey: "songId"});
    Post.belongsTo(models.Playlist, {foreignKey: "playlistId"})
  };
  return Post;
};