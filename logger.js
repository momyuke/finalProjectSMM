const bunyan = require('bunyan');
const dotenv = require('dotenv');

dotenv.config();
const logConfig =  bunyan.createLogger({
    name : process.env.APP_NAME,
    level : process.env.LOG_LEVEL,
    streams : [
        {stream : process.stdout},
    {
        type : 'rotating-file',
        period : '1d',
        count : 4,
        level : 'error',
        path : process.env.LOG_PATH
    }
    ]
});

const recordLog = (logInfo) => {
    switch(logInfo.logType){
        case 'FATAL':
        logConfig.fatal(logInfo.logTitle, logInfo.logMessage);
        break;

        case 'ERROR':
        logConfig.error(logInfo.logTitle, logInfo.logMessage);
        break;

        case 'INFO':
        logConfig.info(logInfo.logTitle, logInfo.logMessage);
        break;
    }
}

module.exports = recordLog;