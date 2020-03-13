const express = require('express');
const dotenv = require('dotenv');
const connection = require('./dbConn');
const server = require('./server');
const logEvent = require('./source/event/myEmitter');

dotenv.config();
if(process.env.APP_NAME){
    connection.authenticate().then(() => {
        server.listen(process.env.APP_PORT, '0.0.0.0');
        if(server.listening){
            logEvent.emit('APP_INFO', { 
                logTitle : '[SERVER-RUNNING]',
                logMessage : `Server has been running in port ${process.env.APP_PORT}`
            });
        }
        
    }).catch((err) => {
        logEvent.emit('APP_ERROR', {
            logTitle : '[DB-ERROR]',
            logMessage : err
        });
    })
}else {
    process.exit(1);
}