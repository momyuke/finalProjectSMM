const History = require('../models/history');
const date = new Date();
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const {Op} = require('sequelize');
const moment = require('moment');


class HistoryClass{
    async createHistory(employee){
        let result;
        try {
            //check, is it there employee in database that employeeId is the same with employee that input by client ? 
            const checkEmployee = await Employee.findOne({where : 
                {employeeId : employee.employeeId}
            });
            
            //if there are, check again is there history attendance that have value of field 'in' 
            if(checkEmployee !== null){
                 result = await History.findOne({where : {
                    employeeId : employee.employeeId,
                    in : {[Op.like] : `%${date.toLocaleDateString()}%`},
                    out: null
                }});

                //if there are, update the field 'out' with date now
                const optionTime = {hour12 : false};
                if(result !== null) { 
                   result.out = date.toLocaleString('id-ID', optionTime);
                   result.save();   
                
            //if not, create a new history attendance
                }else {
                    const checkHistoryEmployee = await History.findOne({where : {
                        employee : employee.employeeId,
                        in : {[Op.like] : `%${date.toLocaleDateString()}%`},
                        out : {[Op.like] : `%${date.toLocaleDateString()}%`},
                    }});

                    if(checkHistoryEmployee === null){
                        result = await History.create({
                            employeeId : employee.employeeId,
                            in : date.toLocaleString('id-ID', optionTime)
                        });
                    }else { 
                        result = {message : "Employee have been attend and out today"}
                    }
                }
                //if there isn't employee in database. Return like this
            }else {
                result = {message : false}
            }
            
        } catch (e) {
          logEvent.emit('APP_ERROR',{
              logTitle: '[CREATE-HISTORY-ERROR]',
              logMessage: e
          });
        }
        return result;
    }

    async createHistorySync(employee){
        let result;
        try {
            let checkData = await Employee.findOne({where : {
                employeeId : employee.employeeId
            }});
            
            if(checkData){
               const checkDataHistory = await History.findOne({where : {
                    employee : employee.employeeId,
                    in : {[Op.like] : moment().format('YYYY-MM-DD')},
                    out : null
                }});

                if(checkDataHistory !== null){
                    checkDataHistory.out = employee.out;
                    checkDataHistory.save();
                }else {
                    const checkDateAttendance = await History.findOne({where : {
                        employee: employee.employeeId,
                        in : {[Op.like] : moment().format('YYYY-MM-DD')},
                        out : {[Op.like] : moment().format('YYYY-MM-DD')},
                    }});

                    if(checkDateAttendance){
                        result = {message : 'Sorry, you have been attend and out today'}
                    }else {
                        result = await History.create(employee);
                    }
                }
            }else {
                result = {message : 'Sorry, Employee that input is not valid'}
            }
        } catch (e) {
            logEvent.emit('APP_ERROR',{
                logTitle: 'CREATE-HISTORY-ATTEND-ERROR',
                logMessage: e
            });            
        }
    }

    async getHistoryByEmployeeId(employeeId){
        let result;
        try {
            result = await History.findAll({where : {employeeId : employeeId.employeeId}});
            
        } catch (e) {
            logEvent.emit('APP_ERROR',{
                logTitle: '[GET-HISTORY-ATTENDANCE-BY-ID-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getAllHistory(){
        let result;
        try {
            result = await History.findAll();
        } catch (e) {
            logEvent.emit('APP_ERROR',{
                logTitle: '[GET-ALL-HISTORY-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getHistoryByDateNow(){
        let result;
        try{
            result = await History.findAll({where: {
                in : {[Op.like] : `%${moment().format('YYYY-MM-DD')}%`}
            }});
        }catch(e){
            logEvent.emit('APP_ERROR',{
                logTitle: '[GET-HISTORY-BY-DATE-NOW-ERROR]',
                logMessage: e
            });
        }

        return result;
    }
}

module.exports = HistoryClass;