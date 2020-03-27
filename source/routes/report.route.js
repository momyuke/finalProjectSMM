const express = require('express');
const router = express.Router();

const ReportServices = require('../services/report.services');
const {controlCreateReport, controlGetReport} = require('../controller/report.controller');

const Services = new ReportServices();

router.post('/', (req,res) => controlCreateReport(req,res,Services));
router.get('/', (req,res) => controlGetReport(req,res,Services));

module.exports = router;