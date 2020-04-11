const express = require('express');
const router = express.Router();

const ReportServices = require('../services/report.services');
const ReportController = require('../controller/report.controller');

const Controller = new ReportController();
const Services = new ReportServices();

router.post('/', (req,res) => Controller.controlCreateReport(req,res,Services));
router.get('/datenow/:id?', (req,res) => Controller.getReport(req,res,Services));
router.get('/:id?', (req,res) => Controller.controlGetReport(req,res,Services));
router.post('/sync', (req,res) => Controller.controlCreateReportSync(req,res,Services));

module.exports = router;