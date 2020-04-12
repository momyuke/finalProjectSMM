const Sequelize = require('sequelize');
const connectionDb = require('../../dbConn');

const LogSync = connectionDb.define('logsync', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },

    employeeId : {
        type : Sequelize.STRING
    },

    userId :{
        type : Sequelize.STRING
    },
    
    status : {
        type : Sequelize.ENUM('INSERT, UPDATE', 'DELETE')
    }
    
    
}, {
    freezeTableName : false,
    tableName : 'logsync'
});

module.exports = LogSync;