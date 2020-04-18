const express = require('express');
const router = express.Router();

const ReportServices = require('../services/report.services');
const ReportController = require('../controller/report.controller');
const getReportPdf = require('../controller/report-pdf.controller');
const tokenValidation = require('../middleware/tokenValidation');

const Controller = new ReportController();
const Services = new ReportServices();

router.use(tokenValidation);
router.post('/', (req,res) => Controller.controlCreateReport(req,res,Services));
router.get('/datenow/:id?', (req,res) => Controller.getReport(req,res,Services));
router.get('/:id?', (req,res) => Controller.controlGetReport(req,res,Services));
router.post('/sync', (req,res) => Controller.controlCreateReportSync(req,res,Services));
router.get('/report-pdf/:employeeId', (req,res) => getReportPdf(req,res));

module.exports = router;

