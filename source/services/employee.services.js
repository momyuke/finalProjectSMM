const Employee = require('../models/employee');


class EmployeeService{
    async getEmployee(){
        let result;
        try{
            result = await Employee.findAll();
        }catch(e){
            logEvent.emit('APP_ERROR',{
                logTitle: '[GET-ALL-EMPLOYEE-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async updateEmployee(employee){
        let result;
        try {
            result = await Employee.update(employee, {where:{
                employeeId : employee.employeeId
            }});

        } catch (e) {
            logEvent.emit('APP_ERROR',{
                logTitle: '[UPDATE-EMPLOYEE-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getEmployeeById(idEmployee){
        let result;
        try{
            result = await Employee.findOne({where: {
                employeeId : idEmployee
            }});
        }catch(e){
            logEvent.emit('APP_ERROR',{
                logTitle: '[GET-EMPLOYEE-BY-ID-ERROR]',
                logMessage : e
            });
        }

        return result;
    }

}
module.exports = EmployeeService;