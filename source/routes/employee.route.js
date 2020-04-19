const express = require('express');
const router = express.Router();

const EmployeeServices = require('../services/employee.services');
const EmployeeController = require('../controller/employee.controller');

const uploadHandler = require('../middleware/fileHandler');

const Services = new EmployeeServices();
const Controller = new EmployeeController();

const tokenValidation = require('../middleware/tokenValidation');

router.use(tokenValidation);
router.get('/:id?', (req,res) => Controller.controlGetEmployee(req,res,Services));
router.post('/', uploadHandler('photoUrl').single('photoUrl'),(req,res) => Controller.controlCreateEmployee(req,res,Services));
router.put('/', uploadHandler('photoUrl').single('photoUrl'),(req,res) => Controller.controlUpdateEmployee(req,res,Services));
router.delete('/', (req,res) => Controller.controlNonActivaedEmployee(req,res,Services));

module.exports = router;