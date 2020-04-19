const express = require('express');
const router = express.Router();
const UserServices = require('../services/user.services');
const UserController = require('../controller/user.controller');
const uploadHandler = require('../middleware/fileHandler');

const Controller = new UserController();
const Services = new UserServices();
const tokenValidation = require('../middleware/tokenValidation');


router.use(tokenValidation);
router.get('/', (req, res) => Controller.controlGetUser(req, res, Services));
router.post('/', uploadHandler('photoUrl').single('photoUrl'), (req, res) => Controller.controlCreateUser(req, res, Services));
router.delete('/', (req,res) => Controller.controlDeleteUser(req,res,Services));
router.put('/', uploadHandler('photoUrl').single('photoUrl'), (req, res) => Controller.controlUpdateUser(req, res, Services));



module.exports = router;