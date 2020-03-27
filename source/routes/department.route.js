const express = require('express');
const router = express.Router();
const DepartmentServices = require('../services/department.services');
const {controlCreateDepartment, controlGetDepartment, controlUpdateDepartment} = require('../controller/department.controller');

const Services = new DepartmentServices();

router.get('/', (req,res) => controlGetDepartment(req,res,Services));
router.put('/', (req,res) => controlUpdateDepartment(req,res,Services));
router.post('/', (req,res) => controlCreateDepartment(req,res,Services));


module.exports = router;