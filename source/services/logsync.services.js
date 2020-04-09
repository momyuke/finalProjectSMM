const LogSync = require('../models/logSync');
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const User = require('../models/user');
const Department = require('../models/department');

class LogSyncServices {
    async getLogSync(){
        let result;
        try {
            result = await LogSync.findAll(
                {include : 
                    [
                        {model : Employee, include : [Department]}, 
                        User
                    ]
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