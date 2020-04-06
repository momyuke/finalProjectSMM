const Report = require('../models/report');
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const { Op } = require('sequelize');
const moment = require('moment');


class ReportClass {
    /* 
        
        req.body = {
            employeeId : 
            time : DateTime.now().toString();
            status: 
        }
        
    */

    async createNewReport(report) {
        let result;
        let checkDataReport;
        try {
            const checkDataEmployee = await Employee.findOne({
                where: {
                    employeeId: report.employeeId,
                    status: 'Active'
                }
            });
            if (checkDataEmployee !== null) {

                const timeReport = moment(report.time).format('HH:mm:ss');
                const dateInReport = moment(report.time, 'YYYY-MM-DD').toDate();

                checkDataReport = await Report.findOne({
                    where: {
                        outTime: { [Op.not]: null },
                        inTime: { [Op.not]: null },
                        dateReport: dateInReport,
                        employeeId: report.employeeId
                    }
                });

                if (checkDataReport) {
                    return { message: 'You have been attend and out today' }
                } else {
                    switch (report.status) {
                        case 'IN':
                            checkDataReport = await Report.findOne({
                                where: {
                                    inTime: { [Op.not]: null },
                                    dateReport: dateInReport,
                                    employeeId: report.employeeId
                                }
                            });

                            if (checkDataReport) {
                                return { message: 'You have been attend today' }
                            } else {
                                result = await Report.create({
                                    inTime: timeReport,
                                    dateReport: dateInReport,
                                    employeeId: report.employeeId
                                });
                            }
                            break;

                        case 'OUT':
                            checkDataReport = await Report.findOne({
                                where: {
                                    inTime: { [Op.not]: null },
                                    outTime: null,
                                    dateReport: dateInReport,
                                    employeeId: report.employeeId
                                }
                            });

                            if (checkDataReport) {
                                result = checkDataReport;
                                result.outTime = timeReport;
                                result.save();
                            } else {
                                checkDataReport = await Report.findOne({
                                    where: {
                                        outTime: { [Op.not]: null },
                                        dateReport: dateInReport,
                                        employeeId: report.employeeId
                                    }
                                })

                                if (checkDataReport) {
                                    return { message: 'you have been out today' }
                                } else {
                                    result = await Report.create({
                                        outTime: timeReport,
                                        dateReport: dateInReport,
                                        employeeId: report.employeeId
                                    });
                                }
                            }
                            break;

                        default:
                            return { message: `Status ${report.status} is not valid` }
                    }
                }

            } else {
                return { message: 'Employee is not valid or the status is inactive. Please contact your human resource to activate your data' }
            }

        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[CREATE-NEW-REPORT-NEW]',
                logMessage: e
            });
        }

        return result;
    }


    async getReportByEmployeeId(report) {
        let result;
        try {
            result = await Report.findAll({
                where:
                    { employeeId: report.employeeId, },
                include: Employee
            });

        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-HISTORY-ATTENDANCE-BY-ID-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getAllReport() {
        let result;
        try {
            result = await Report.findAll();
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-ALL-HISTORY-ERROR]',
                logMessage: e
            });
        }

        return result;
    }

    async getReportBySomeDate(report) {
        let result;
        try {
            result = await Report.findAll({ where: { dateReport: report.dateReport } });
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-ALL-HISTORY-BY-SOME-DATE-ERROR]',
                logMessage: e
            });
        }

        return result
    }

    async getReportByDateNowAndEmployeeId(report) {
        let result;
        try {
            result = await Report.findAll({
                where: {
                    dateReport: moment().format('YYYY-MM-DD'),
                    employeeId: report.employeeId
                },
            })
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-REPORT-DATENOW-AND-EMPLOYEEID]',
                logMessage: e
            })
        }
        return result;
    }

    async getReportByDateNow() {
        let result;
        try {
            result = await Report.findAll({
                where: {
                    dateReport: moment().format('YYYY-MM-DD')
                },
                
            });
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: '[GET-HISTORY-BY-IN-DATE-NOW-ERROR]',
                logMessage: e
            });
        }

        return result;
    }


}

module.exports = ReportClass;