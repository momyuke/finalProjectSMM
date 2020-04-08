const LogSync = require('../models/logSync');
const logEvent = require('../event/myEmitter');

class LogSyncServices {
    async getLogSync(){
        let result;
        try {
            result = await LogSync.findAll();
            
            result.forEach( async (data) => {
                await data.destroy();
            });
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[GET-LOG-SYNC-ERROR]',
                logMessage : e
            });
        }
        return result;
    }
}

module.exports = LogSyncServices;