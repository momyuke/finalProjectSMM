const Report = require('../models/report');
const Employee = require('../models/employee');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

async function controlReportPdf(req, res) {
    try {
        const employeeId = req.params.employeeId;
        const field = ['dateReport', 'inTime', 'outTime']
        const dataReport = await Report.findAll({
            where: { employeeId: employeeId },
            attributes: field
        });
        const dataEmployee = await Employee.findByPk(employeeId);
        const nameofFile = `Report-${dataEmployee.firstName}-${moment().format('YYYY-MM-DD_HH-mm-ss')}`;
        const title = `Report Attendace ${dataEmployee.firstName}`
        const dataContent = [];
        dataReport.forEach((data) => {
            dataContent.push({
                "dateReport": data.dateReport,
                "inTime": data.inTime,
                "outTime": data.outTime
            });
        });

        ejs.renderFile(path.join(__dirname, '../../assets/report/content.ejs'), {
            title: title,
            header: ['Tanggal', 'Jam Masuk', 'Jam Keluar'],
            content: dataContent
        }, (err, data) => {
            if (err) {
                throw new Error(err)
            } else {
                let option = {
                    "format": "A4",
                    "orientation": "potrait"
                };

                pdf.create(data, option).toFile(`${nameofFile}.pdf`,
                    function (err, data) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            res.set('Content-Type', 'application/pdf');
                            setTimeout(() => {
                                fs.unlinkSync(path.join(__dirname, `../../${nameofFile}.pdf`));
                            }, 10000);
                            res.download(`${nameofFile}.pdf`)
                        }
                    });
            }
        });
    } catch (e) {
        res.status(500);
        res.json({ message: e.message });
    }
}

module.exports = controlReportPdf;
