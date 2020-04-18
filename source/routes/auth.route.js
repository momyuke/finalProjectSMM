const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth.service');
const AuthController = require('../controller/auth.controller');

const controller = new AuthController();
const service = new AuthService();

router.get('/w-email', (req,res) => controller.authGoogleSignIn(req,res,service));
router.post('/', (req,res) => controller.authNormal(req,res,service));

module.exports = router;