'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [{
      title: "Monotony",
      length: 185,
      albumId: 1,
      audioUrl: "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/1.mp3",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Ants",
      length: 246,
      albumId: 1,
      audioUrl: "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/2.mp3",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Hans in Luck",
      length: 406,
      albumId: 1,
      audioUrl: "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/3.mp3",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Life",
      length: 353,
      albumId: 2,
      audioUrl: "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/5.mp3",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Death & Redemption",
      length: 350,
      albumId: 2,
      audioUrl: "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/6.mp3",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "King",
      length: 238,
      albumId: 3,
      audioUrl: "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/7.mp3",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Fate",
      length: 252,
      albumId: 3,
      audioUrl: "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/8.mp3",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
},

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Songs', null, {});
  }
};
