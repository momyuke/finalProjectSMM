const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth.service');
const AuthController = require('../controller/auth.controller');

const service = new AuthService();

router.post('/', (req,res) => AuthController(req,res,service));
module.exports = router;