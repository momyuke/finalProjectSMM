const LogSync = require('../models/logSync');
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const User = require('../models/user');
const Department = require('../models/department');
const {Op} = require('sequelize');

class LogSyncServices {
    async getLogSync(log) {
        let result;
        try {
            const dataLog = await LogSync.findAll(
                {
                    where: {id : {[Op.gt] : log.id }},
                    include:
                        [
                            { model: Employee, include: [Department] },
                            User
                        ],
                    order : [
                        ['id', 'ASC']
                    ]
                });
            if(dataLog){
                result = {
                    version : dataLog[dataLog.length - 1].id,
                    data : dataLog
                }
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-LOG-SYNC-ERROR]',
                logMessage: e
            });
            throw new Error(e);
        }
        return result;
    }
}

module.exports = LogSyncServices;