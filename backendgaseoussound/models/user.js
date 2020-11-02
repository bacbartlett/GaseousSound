'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull:false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull:false
    },
    artistName: {
      type: DataTypes.STRING(50),
      allowNull:false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull:false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull:false
    },
    profileImageUrl: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Follow, {foreignKey: "userId"});
    User.hasMany(models.Playlist, {foreignKey: "userId"});
    User.hasMany(models.Listen, {foreignKey: "userId"});
    User.hasMany(models.Post, {foreignKey: "userId"});
    User.hasMany(models.Album, {foreignKey: "userId"});
    User.hasMany(models.Like, {foreignKey: "userId"});
    User.hasMany(models.Follow, {foreignKey: "artistId"});
  };
  return User;
};