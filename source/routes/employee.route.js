const express = require('express');
const router = express.Router();

const ServiceEmployee = require('../services/employee.services');
const {getDataEmployee} = require('../controller/employee.controller');

const Services = new ServiceEmployee();

router.get('/', (req,res) => getDataEmployee(req,res,Services));

module.exports = router;