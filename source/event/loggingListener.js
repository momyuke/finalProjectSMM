const recordLog = require('../../logger');
const logEvent = require('./myEmitter');

const loggingListener = () => {
    logEvent.on('APP_ERROR', function(ev){
        recordLog({logType : 'ERROR', logTitle : ev.logTitle, logMessage : ev.logMessage});
    })

    logEvent.on('APP_FATAL', function(ev){
        recordLog({logType : 'FATAL', logTitle : ev.logTitle, logMessage : ev.logMessage});
        process.exit(1);
    })

    logEvent.on('APP_INFO', function(ev){
        recordLog({logType : 'INFO', logTitle : ev.logTitle, logMessage : ev.logMessage});
    })
}

module.exports = loggingListener;