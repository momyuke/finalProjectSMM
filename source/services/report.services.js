const Report = require('../models/report');
const date = new Date();
const logEvent = require('../event/myEmitter');
const Employee = require('../models/employee');
const { Op } = require('sequelize');
const moment = require('moment');


class ReportClass {
    async createReport(report) {
        let result;
        try {
            const checkTime = report.time;
            report.time = moment(report.time).format('dddd,D MMM YYYY HH:mm:ss');
            let checkData = await Employee.findOne({ where: { employeeId: report.employeeId } });
            if (checkData !== null) {
                if (moment(checkTime).hours() >= 7 && moment(checkTime).hours() <= 11) {
                    let checkDataReport = await Report.findOne({
                        where: {
                            employeeId: report.employeeId,
                            inTime: { [Op.like]: `%${moment(checkTime).format('D MMM YYYY')}%` },
                            outTime: null
                        }
                    });
                    if (checkDataReport) {
                        result = { message: 'You have attend today' }
                    } else {
                        result = await Report.create({
                            employeeId: report.employeeId,
                            inTime: report.time
                        });
                    }
                } else {
                    let checkDataReport = await Report.findOne({
                        where: {
                            employeeId: report.employeeId,
                            outTime: { [Op.like]: `%${moment(checkTime).format('D MMM YYYY')}%` },
                        }
                    });

                    if (checkDataReport) {
                        result = { message: 'You have been out today' }
                    } else {
                        checkDataReport = await Report.findOne({
                            where: {
                                employeeId: report.employeeId,
                                inTime: { [Op.like]: `%${moment(checkTime).format('D MMM YYYY')}%` },
                            }
                        });

                        if (checkDataReport) {
                            result = checkDataReport;
                            result.outTime = report.time;
                            result.save();
                        } else {
                            result = await Report.create({
                                employeeId: report.employeeId,
                                outTime: report.time
                            });
                        }
                    }
                }
            } else {
                result = { message: 'Employee is not valid' };
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: 'CREATE-NEW-REPORT-ERROR',
                logMessage: e
            });
        }

        return result;
    }


    async createReportSync(report) {
        let result;
        try {

            const checkTime = report.time;
            report.time = moment(report.time).format('dddd, D MMM YYYY k:m:s');

            let checkData = await Employee.findOne({
                where: {
                    employeeId: report.employeeId,
                    active: 'Y'
                }
            });

            if (checkData) {
                const checkDataReport = await Report.findOne({
                    where: {
                        employeeId: report.employeeId,
                        inTime: { [Op.like]: `%${moment(checkTime).format('D MMM YYYY')}%` },
                        outTime: null
                    }
                });

                if (checkDataReport !== null) {
                    result = checkDataReport;
                    result.outTime = report.time;
                    result.save();
                } else {
                    const checkDateAttendance = await Report.findOne({
                        where: {
                            employeeId: report.employeeId,
                            inTime: { [Op.like]: `%${moment(checkTime).format('D MMM YYYY')}%` },
                            outTime: { [Op.like]: `%${moment(checkTime).format('D MMM YYYY')}%` },
                        }
                    });

                    if (checkDateAttendance) {
                        result = { message: 'Sorry, you have been attend and out today' }
                    } else {
                        result = await Report.create({
                            employeeId: report.employeeId,
                            inTime: report.time
                        });
                    }
                }
            } else {
                result = { message: 'Employee not found' }
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle: 'CREATE-REPORT-ATTEND-ERROR',
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
                    { employeeId: report.employeeId, }
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

    async getReportBySomeDate(report){

        let result;
        try {
            result = await Report.findAll({
                where: {
                    [Op.or]: [
                        {
                            outTime : {[Op.like] : `%${moment(report.time).format('D MMM YYYY')}%`}
                        },
                        {
                            inTime: { [Op.like]: `%${moment(report.time).format('D MMM YYYY')}%` },
                        }
                    ]
                }
            });
        } catch (e) {
            
        }

        return result;
    }


    async getReportByDateNowAndEmployeeId(report){
        let result;
        try {
            result = await Report.findOne({
                where: {
                    employeeId : report.employeeId,
                    
                    [Op.or]: [
                        {
                            outTime : {[Op.like] : `%${moment().format('D MMM YYYY')}%`}
                        },
                        {
                            inTime: { [Op.like]: `%${moment().format('D MMM YYYY')}%` },
                        }
                    ]
                }
            })
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[GET-REPORT-BY-DATENOW-AND-EMPLOYEEID-ERROR]',
                logMessage : e
            });
        }

        return result
    }

    async getReportByDateNow() {
        let result;
        try {
            result = await Report.findAll({
                where: {
                    [Op.or]: [
                        {
                            outTime : {[Op.like] : `%${moment().format('D MMM YYYY')}%`}
                        },
                        {
                            inTime: { [Op.like]: `%${moment().format('D MMM YYYY')}%` },
                        }
                    ]
                }
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