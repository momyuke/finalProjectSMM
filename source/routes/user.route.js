const express = require('express');
const router = express.Router();
const UserServices = require('../services/user.services');
const UserController = require('../controller/user.controller');

const Controller = new UserController();
const Services = new UserServices();

router.get('/', (req,res) => Controller.controlGetUser(req,res,Services));
router.put('/', (req,res) => Controller.controlUpdateUser(req,res,Services));
router.post('/', (req,res) => Controller.controlCreateUser(req,res,Services));


module.exports = router;