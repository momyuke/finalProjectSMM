const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const Employee = connection.define('employee',{
    id : {
        type: Sequelize.STRING,
        primaryKey : true,
        allowNull : false
    },

    departmentId :{
        type : Sequelize.INTEGER
    },

    firstName : {
        type : Sequelize.STRING,
    }, 
    lastName : {
        type: Sequelize.STRING
    },

    gender : {
        type : Sequelize.ENUM('Male', 'Female')
    },

    dateofbirth:{
        type: Sequelize.DATEONLY
    },

    placeofbirth:{
        type : Sequelize.STRING
    },

    familyName: {
        type : Sequelize.STRING
    },

    familyNumber : {
        type : Sequelize.STRING
    },

    photoUrl : {
        type : Sequelize.STRING
    },

    phone :{
        type : Sequelize.STRING
    },

    bloodType : {
        type: Sequelize.ENUM('A', 'B', 'O', 'AB')
    },

    hiredDate: {
        type : Sequelize.DATEONLY
    },

    status :{
        type : Sequelize.ENUM('Active', 'Inactive')
    }
}, { 
    freezeTableName : true,
    tableName : 'employee',
});

module.exports = Employee;