const express = require('express');
const router = express.Router();
const tokenValidation = require('../middleware/tokenValidation');

const DepartmentServices = require('../services/department.services');
const DepartmentController = require('../controller/department.controller');

const Controller = new DepartmentController();
const Services = new DepartmentServices();

router.get('/', (req,res) => Controller.controlGetDepartment(req,res,Services));
router.use(tokenValidation);
router.put('/', (req,res) => Controller.controlUpdateDepartment(req,res,Services));
router.post('/', (req,res) => Controller.controlCreateDepartment(req,res,Services));


module.exports = router;