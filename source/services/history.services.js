const History = require('../models/history');
const date = new Date();
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const { Op } = require('sequelize');
const moment = require('moment');


class HistoryClass {
    async createHistorySync(history) {
        let result;
        try {
            let checkData = await Employee.findOne({
                where: {
                    employeeId: employee.employeeId,
                    active: 'Y'
                }
            });

            if (checkData) {
                const checkDataHistory = await History.findOne({
                    where: {
                        employee: employee.employeeId,
                        in: { [Op.like]: moment().format('YYYY-MM-DD') },
                        out: null
                    }
                });

                if (checkDataHistory !== null) {
                    checkDataHistory.out = employee.out;
                    checkDataHistory.save();
                } else {
                    const checkDateAttendance = await History.findOne({
                        where: {
                            employee: employee.employeeId,
                            in: { [Op.like]: moment().format('YYYY-MM-DD') },
                            out: { [Op.like]: moment().format('YYYY-MM-DD') },
                        }
                    });

                    if (checkDateAttendance) {
                        result = { message: 'Sorry, you have been attend and out today' }
                    } else {
                        result = await History.create(employee);
                    }
                }
            } else {
                result = { message: 'Sorry, Employee that input is not valid' }
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: 'CREATE-HISTORY-ATTEND-ERROR',
                logMessage: e
            });
        }
    }

    async getHistoryByEmployeeId(history) {
        let result;
        try {
            result = await History.findAll({
                where:
                    { employeeId: history.employeeId, }
            });

        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-HISTORY-ATTENDANCE-BY-ID-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getAllHistory() {
        let result;
        try {
            result = await History.findAll();
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-ALL-HISTORY-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getHistoryByDateNow(history) {
        let result;
        try {
            if(history.in && history.out){
                result = await History.findAll({
                    where: {
                        in: { [Op.like]: `%${moment().format('YYYY-MM-DD')}%` },
                        out: { [Op.like]: `%${moment().format('YYYY-MM-DD')}%` }
                    }
                });    
            } else if (history.in !== null && history.out === null){
                result = await History.findAll({
                    where: {
                        in: { [Op.like]: `%${moment().format('YYYY-MM-DD')}%` }
                    }
                });
            } else if (history.in === null && history.out !== null){
                result = await History.findAll({
                    where: {
                        out: { [Op.like]: `%${moment().format('YYYY-MM-DD')}%` }
                    }
                });
            }
            
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-HISTORY-BY-IN-DATE-NOW-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    
}

module.exports = HistoryClass;