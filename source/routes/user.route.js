const express = require('express');
const router = express.Router();
const UserServices = require('../services/user.services');
const {controlCreateUser, controlGetUser, controlUpdateUser} = require('../controller/user.controller');

const Services = new UserServices();

router.get('/', (req,res) => controlGetUser(req,res,Services));
router.put('/', (req,res) => controlUpdateUser(req,res,Services));
router.post('/', (req,res) => controlCreateUser(req,res,Services));


module.exports = router;