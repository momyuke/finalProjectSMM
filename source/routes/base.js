const express = require('express');
const router = express.Router();
const logEvent = require('../event/myEmitter');
const routeEmployee = require('../routes/employee.route');
const routeReport = require('./report.route');
const routeUser = require('./user.route');


router.use('/user', routeUser);
router.use('/employee', routeEmployee);
router.use('/report', routeReport);

//No Route
//if user go to unknown page
router.use((req, res) => {
    logEvent.emit('APP_ERROR', {
        logTitle : '[NO-ROUTE]',
        logMessage : `There is no route to ${req.url}`
    });
    res.status(404);
    res.json({message : `There is no route to ${req.url}`});
});


module.exports = router;