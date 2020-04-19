const LogSync = require('../models/logSync');
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const User = require('../models/user');
const Department = require('../models/department');
const { Op } = require('sequelize');
const moment = require('moment');
const Report = require('../models/report');

class LogSyncServices {
    async getLogSync(log) {
        let result;
        try {
            const dataLog = await LogSync.findAll(
                {
                    where: { id: { [Op.gt]: log.id } },
                    include:
                        [
                            { model: Employee, include: [Department] },
                            User
                        ],
                    order: [
                        ['id', 'ASC']
                    ]
                });
            if (dataLog.length > 0) {
                result = {
                    version: dataLog[dataLog.length - 1].id,
                    data: dataLog
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

    async dumpDataInit(secretKey) {
        let result;
        try {
            if (secretKey === process.env.SECRET_KEY) {
                const dataEmployee = await Employee.findAll({ include: [Department] });
                const dataUser = await User.findAll();
                const today = moment();
                const dataReport = await Report.findAll({ 
                    where: { 
                        dateReport: {
                            [Op.gte] : moment.tz(today.subtract(7, 'days').format('YYYY-MM-DD'), 'Asia/Jakarta'),
                            [Op.lte] : moment.tz(today.format('YYYY-MM-DD'), 'Asia/Jakarta')
                        } 
                    } })
                result = { employee: dataEmployee, user: dataUser, report: dataReport }
            } else {
                result = { status: 401 }
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-DUMP-INIT-ERROR]',
                logMessage: e
            });
            throw new Error(e);
        }

        return result;
    }
}

module.exports = LogSyncServices;