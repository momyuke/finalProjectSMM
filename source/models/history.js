const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const History = connection.define('historyattendance',{
    historyId : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    in: {
        type: Sequelize.STRING,
    },
    out:{
        type: Sequelize.STRING
    },

    employeeId:{
        type: Sequelize.STRING
    }
},{
    frezeeTableName: false,
    tableName: 'historyattendance'
});

module.exports = History;