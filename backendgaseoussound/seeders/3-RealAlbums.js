'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        title: "Modern Times",
        userId: 1,
        artworkUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/2.jpg",
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      title: "A Man's Life",
      userId: 1,
      artworkUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/3.jpg",
      genreId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    title: "August 2018",
    userId: 2,
    artworkUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/5.jpg",
    genreId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
}
  ], {});
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
