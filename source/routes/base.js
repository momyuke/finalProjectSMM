const express = require('express');
const router = express.Router();
const logEvent = require('../event/myEmitter');
const routeEmployee = require('../routes/employee.route');
const routeHistory = require('../routes/history.route');


router.use('/employee', routeEmployee);
router.use('/history', routeHistory);

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