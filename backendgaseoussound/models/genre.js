'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    title: {
      type: DataTypes.STRING(50),
      allowNull:false
    }
  }, {});
  Genre.associate = function(models) {
    Genre.hasMany(models.Album, {foreignKey: "genreId"})
  };
  return Genre;
};