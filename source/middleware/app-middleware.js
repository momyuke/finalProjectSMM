const express = require('express');
const router = express.Router();
const dbRelation = require('../models/dbRelation');

router.use('/images', express.static('assets/images'));
router.use(express.json());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use((req,res,next) => {
    dbRelation();
    next();
});

module.exports = router;