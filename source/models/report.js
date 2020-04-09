const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const Report = connection.define('report',{
    id : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },

    dateReport :{
        type : Sequelize.DATEONLY
    },

    inTime: {
        type: Sequelize.STRING,
    },
    outTime:{
        type: Sequelize.STRING
    },

    employeeId:{
        type: Sequelize.STRING
    }
},{
    frezeeTableName: false,
    tableName: 'report'
});

module.exports = Report;