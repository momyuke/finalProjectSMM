const express = require('express');
const router = express.Router();

const ServiceEmployee = require('../services/employee.services');
const {controlGetEmployee, controlCreateEmployee, controlUpdateEmployee} = require('../controller/employee.controller');

const Services = new ServiceEmployee();

router.get('/', (req,res) => controlGetEmployee(req,res,Services));
router.put('/', (req,res) => controlUpdateEmployee(req,res,Services));
router.post('/', (req,res) => controlCreateEmployee(req,res,Services));

module.exports = router;