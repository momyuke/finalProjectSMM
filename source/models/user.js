const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const User = connection.define('user', {
    userId : {
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true,
        allowNull : false
    },
    
    username : {
        type : Sequelize.STRING
    }, 

    password : {
        type : Sequelize.STRING
    }
}, {
    freezeTableName : false,
    tableName : 'user'
});