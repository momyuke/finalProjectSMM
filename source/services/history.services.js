const History = require('../models/history');
const date = new Date();
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const {Op} = require('sequelize');


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
                    result = await History.create({
                        employeeId : employee.employeeId,
                        in : date.toLocaleString('id-ID', optionTime)
                    });
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

    async getHistoryByEmployeeId(employeeId){
        let result;
        try {
            result = await History.findAll({where : {employeeId : employeeId.employeeId}});
            
            console.log(typeof result[0].in);

        } catch (e) {
            logEvent.emit('APP_ERROR',{
                logTitle: '[GET-HISTORY-ATTENDACE-BY-ID-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getHistoryByDateNow(){
        let result;
        try{
            result = await History.findAll({where: {
                in : {[Op.like] : `${date.toLocaleDateString}`}
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