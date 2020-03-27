const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const Department = connection.define('department', {
    departmentId : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    departmentName : {
        type : Sequelize.STRING
    }
}, {
    freezeTableName : true,
    tableName : 'department'
});

module.exports = Department;