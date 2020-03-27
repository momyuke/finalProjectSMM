const Department = require('../models/department');
const logEvent = require('../event/myEmitter');

class DepartmentServices{

    async getAllDepartment(){
        let result;

        try {
            result = await Department.findAll();
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[GET-ALL-DEPARTMENT-ERROR]',
                logMessage : e
            })
        }

        return result;
    }

    async createDepartment(department){
        let result;

        try {
            result = await Department.create(department);
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[CREATE-DEPARTMENT-ERROR]',
                logMessage : e
            })
        }

        return result;
    }

    async updateDepartment(department){
        let result;

        try{
           const updateData = await Department.update(department, {where : {
                departmentId : department.departmentId
           }})
            if(updateData){
                result = await Department.findOne({where : {
                    departmentId : department.departmentId
                }});
            }
        }catch(e){
            logEvent.emit('APP_ERROR', {
                logTitle : '[UPDATE-DEPARTMENT-ERROR]',
                logMessage : e
            })
        }

        return result;
    }
}

module.exports = DepartmentServices;