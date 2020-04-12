const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const User = connection.define('user', {
    id : {
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true,
        allowNull : false
    },

    displayName: {
        type : Sequelize.STRING
    },
    
    email : {
        type : Sequelize.STRING
    }, 

    password : {
        type : Sequelize.STRING
    },

    dateofbirth :{
        type : Sequelize.DATE
    },

    placeofbirth : {
        type : Sequelize.STRING
    },

    address : {
        type : Sequelize.TEXT
    },

    phone :{
        type : Sequelize.STRING
    },

    photoUrl : {
        type : Sequelize.TEXT
    },

    bloodGroup : {
        type : Sequelize.STRING
    },
    deleteAt : {
        type : Sequelize.DATE
    }
}, {
    freezeTableName : false,
    tableName : 'user'
});


module.exports = User;