const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const User = connection.define('user', {
    userId : {
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true,
        allowNull : false
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
    }
}, {
    freezeTableName : false,
    tableName : 'user'
});


module.exports = User;