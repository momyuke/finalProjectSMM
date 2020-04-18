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
            throw new Error(e);
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
            throw new Error(e);
        }

        return result;
    }

    async updateDepartment(department){
        let result;

        try{
           const updateData = await Department.update(department, {where : {
                id : department.id
           }})
            if(updateData){
                result = await Department.findOne({where : {
                    id : department.id
                }});
            }
        }catch(e){
            logEvent.emit('APP_ERROR', {
                logTitle : '[UPDATE-DEPARTMENT-ERROR]',
                logMessage : e
            })
            throw new Error(e);
        }

        return result;
    }
}``

module.exports = DepartmentServices;