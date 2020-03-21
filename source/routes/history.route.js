const express = require('express');
const router = express.Router();

const HistoryServices = require('../services/history.services');
const {createHistory, getHistory} = require('../controller/history.controller');

const Services = new HistoryServices();

router.post('/', (req,res) => createHistory(req,res,Services));
router.get('/:route', (req,res) => getHistory(req,res,Services));

module.exports = router;