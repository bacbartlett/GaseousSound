'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content:{
        type: Sequelize.STRING(500)
      },
      userId: {
        allowNull: false,
        references: {model:"Users"},
        type: Sequelize.INTEGER
      },
      songId: {
        allowNull: false,
        references: {model: "Songs"},
        type: Sequelize.INTEGER
      },
      albumId: {
        allowNull: false,
        references:{model: "Albums"},
        type: Sequelize.INTEGER
      },
      playlistId: {
        allowNull: false,
        references: {model: "Playlists"},
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};