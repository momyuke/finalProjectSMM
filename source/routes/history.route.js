const express = require('express');
const router = express.Router();

const HistoryServices = require('../services/history.services');
const {createHistory} = require('../controller/history.controller');

const Services = new HistoryServices();

router.post('/', (req,res) => createHistory(req,res,Services));

module.exports = router;