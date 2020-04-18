const express = require('express');
const router = express.Router();

const LogsyncServices = require('../services/logsync.services');
const Services = new LogsyncServices();

const LogsyncController = require('../controller/logsync.controller');
const Controller = new LogsyncController();

router.get('/:id', (req,res) => Controller.getLogSyncControl(req,res,Services));
router.get('/dump/init', (req,res) => Controller.getDumpInit(req,res,Services));

module.exports = router;