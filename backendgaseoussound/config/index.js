require("dotenv").config();
module.exports = {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    db: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
    },

    awsConfig: {
        accessKey: process.env.ACCESSKEYID,
        secretKey: process.env.SECRETACCESSKEY,
        region: process.env.REGION
    }
};