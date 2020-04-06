const express = require('express');
const router = express.Router();

const EmployeeServices = require('../services/employee.services');
const EmployeeController = require('../controller/employee.controller');

const Services = new EmployeeServices();
const Controller = new EmployeeController();

router.get('/', (req,res) => Controller.controlGetEmployee(req,res,Services));
router.put('/', (req,res) => Controller.controlUpdateEmployee(req,res,Services));
router.post('/', (req,res) => Controller.controlCreateEmployee(req,res,Services));

module.exports = router;