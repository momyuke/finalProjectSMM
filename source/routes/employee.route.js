const express = require('express');
const router = express.Router();

const EmployeeServices = require('../services/employee.services');
const EmployeeController = require('../controller/employee.controller');

const uploadHandler = require('../middleware/fileHandler');

const Services = new EmployeeServices();
const Controller = new EmployeeController();

router.get('/:employeeId?', (req,res) => Controller.controlGetEmployee(req,res,Services));
router.put('/', (req,res) => Controller.controlUpdateEmployee(req,res,Services));
router.post('/', uploadHandler('employee').single('photoUrl'),(req,res) => Controller.controlCreateEmployee(req,res,Services));

module.exports = router;