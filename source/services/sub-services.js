const LogSync = require('../models/logSync');

const createLogSync = async function (id, identifyTable, identifyStatus) {
    if (identifyTable === 'user') {
            await LogSync.create({
                userId: id,
                status: identifyStatus
            });
    } else{
            await LogSync.create({
                employeeId: id,
                status: identifyStatus
            });
        
    }
}

module.exports = createLogSync;