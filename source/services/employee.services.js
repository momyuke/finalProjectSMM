const Employee = require('../models/employee');
const logEvent = require('../event/myEmitter');
const { Op } = require('sequelize');
const Department = require('../models/department');
const StatusEmployee = { "ACTIVE": "Active", "INACTIVE": "Inactive" }

class EmployeeService {
    async getEmployeeById(employee) {
        let result;
        try {
            result = await Employee.findOne({ where: { employeeId: employee.employeeId, status: StatusEmployee.ACTIVE } });
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

    async createEmployee(employee) {
        let result;
        try {
            employee.status = StatusEmployee.ACTIVE;
            result = await Employee.create(employee);
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
                    employeeId: employee.employeeId
                }
            });

            if (updateData !== null) {
                result = await Employee.findOne({
                    where: {
                        employeeId: employee.employeeId
                    }
                });
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