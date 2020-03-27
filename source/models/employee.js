const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const Employee = connection.define('employee',{
    employeeId : {
        type: Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true,
        allowNull : false
    },

    deptId :{
        type : Sequelize.INTEGER
    },

    firstName : {
        type : Sequelize.STRING,
    }, 
    lastName : {
        type: Sequelize.STRING
    },

    photos : {
        type : Sequelize.STRING
    },

    phone :{
        type : Sequelize.STRING
    },

    bloodGroup : {
        type: Sequelize.STRING
    },

    salary : {
        type : Sequelize.INTEGER
    },

    hiredDate: {
        type : Sequelize.DATE
    },

    deptId :{
        type : Sequelize.STRING
    },

    active :{
        type : Sequelize.STRING
    }
}, { 
    freezeTableName : true,
    tableName : 'employee',
});

module.exports = Employee;