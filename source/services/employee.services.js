const Employee = require('../models/employee');
const logEvent = require('../event/myEmitter');
const { Op } = require('sequelize');
const Department = require('../models/department');
const logSync = require('./sub-services');
const StatusLog = { 'UPDATE': 'UPDATE', 'INSERT': 'INSERT' };
const StatusEmployee = { "ACTIVE": "Active", "INACTIVE": "Inactive" }


class EmployeeService {
    async getEmployeeById(employee) {
        let result;
        try {
            result = await Employee.findOne({ where: { id: employee.id, status: StatusEmployee.ACTIVE }, include : Department });
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-EMPLOYEE-BY-ID-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getAllEmployee() {
        let result;
        try {
            result = await Employee.findAll({
                where: { status: StatusEmployee.ACTIVE },
                include: Department
            }
            );
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-ALL-EMPLOYEE-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    //  report/datenow    
    async createEmployee(employee, reqFile) {
        let result;
        try {
            employee.status = StatusEmployee.ACTIVE;
            if (!reqFile) {
                result = await Employee.create(employee);
                await logSync(result.id, 'employee', StatusLog.INSERT);
            } else {
                employee.photoUrl = reqFile.path;
                result = await Employee.create(employee);
                await logSync(result.id, 'employee', StatusLog.INSERT);
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[CREATE-EMPLOYEE-ERROR]',
                logMessage: e
            })
        }

        return result;
    }

    async updateEmployee(employee) {
        let result;
        try {
            const updateData = await Employee.update(employee, {
                where: {
                    id: employee.id
                }
            });
            if (updateData !== null) {
                result = await Employee.findOne({
                    where: {
                        id: employee.id
                    }
                });
                await logSync(result.id, 'employee', StatusLog.UPDATE);
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[UPDATE-EMPLOYEE-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getEmployeeByName(employee) {
        let result;
        try {

            if (employee.firstName) {
                result = await Employee.findOne({
                    where: {
                        firstName: { [Op.like]: `%${employee.firstName}%` },
                        status: StatusEmployee.ACTIVE
                    }
                });
            } else if (employee.lastName) {
                result = await Employee.findOne({
                    where: {
                        lastName: { [Op.like]: `%${employee.lastName}%` },
                        status: StatusEmployee.INACTIVE
                    }
                });
            }

        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-EMPLOYEE-BY-ID-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

}
module.exports = EmployeeService;