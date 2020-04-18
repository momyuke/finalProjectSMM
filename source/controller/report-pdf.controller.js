const Report = require('../models/report');
const Employee = require('../models/employee');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const {hoursofWork} = require('../services/sub-services')

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
        const title = `Report Attendance ${dataEmployee.firstName}`
        const photoUrl = dataEmployee.photoUrl !== null ? dataEmployee.photoUrl : '/assets/images/default.jpg'
        const dataContent = [];
        dataReport.forEach((data) => {
            let hourWork  = " ";
            data.inTime !== null && data.outTime !== null ? hourWork = hoursofWork(data.inTime, data.outTime) : null;
            dataContent.push({
                "dateReport": data.dateReport,
                "inTime": data.inTime,
                "outTime": data.outTime,
                "hourOfWork" : hourWork
            });
        });

        ejs.renderFile(path.join(__dirname, '../../assets/report/content.ejs'), {
            title: title,
            header: ['Tanggal', 'Jam Masuk', 'Jam Keluar', "Jumlah Jam Kerja"],
            content: dataContent
            // photoUrl: photoUrl
        }, (err, data) => {
            if (err) {
                throw new Error(err.message)
            } else {
                let option = {
                    "format": "A4",
                    "orientation": "potrait"
                };

                pdf.create(data, option).toFile(path.join(__dirname, `../../${nameofFile}.pdf`),
                    function (err, data) {
                        if (err) {
                            throw new Error(err.message);
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
