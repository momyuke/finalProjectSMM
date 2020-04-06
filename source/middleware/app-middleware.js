const express = require('express');
const router = express.Router();
const dbRelation = require('../models/dbRelation');


router.use(express.json());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

router.use((req,res,next) => {
    dbRelation();
    next();
});

module.exports = router;