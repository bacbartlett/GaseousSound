'use strict';
const bcrypt = require("bcryptjs")
module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Users', [
        {firstName: "Dee",
          lastName: "Yan-Key",
          artistName: "Dee Yan-Key",
          email: "DeeYanKey@example.com",
          hashedPassword: bcrypt.hashSync("password", 10),
          profileImageUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/1.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {firstName: "Yung",
          lastName: "Kartz",
          artistName: "Yung Kartz",
          email: "Yung Kartz@example.com",
          hashedPassword: bcrypt.hashSync("password", 10),
          profileImageUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/4.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {firstName: "Demo",
        lastName: "User",
        artistName: "Demouser",
        email: "demoUser@example.com",
        hashedPassword: bcrypt.hashSync("password", 10),
        profileImageUrl: "https://gaseoussoundphotos.s3.us-east-2.amazonaws.com/profileImages/defaultProfile.png",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};



// {firstName: ,
//   lastname: ,
//   artistName: ,
//   email: ,
//   hashedPassword: ,
//   createdAt: new Date(),
//   updatedAt: new Date()
// }