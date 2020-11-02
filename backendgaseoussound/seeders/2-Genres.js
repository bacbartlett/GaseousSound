'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Genres', [{
        title: "Classical",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Hip Hop",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Ska",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Rock",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Punk",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Pop",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Indie",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Rap",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Metal",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Country",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Instrumental",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Experimental",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
