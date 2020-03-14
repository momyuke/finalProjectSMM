const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        // dialectOptions: {
        //     useUTC: true,
        //     dateStrings: true,
        //     typeCast: true,
        // },
        dialect : process.env.DB_TYPE,
        port : process.env.DB_PORT,
        host : process.env.DB_HOST,
        define : {
            timestamps : false
        },
        timezone: '+07:00',
    }
);

module.exports = connection;