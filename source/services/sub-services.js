const LogSync = require('../models/logSync');
const moment = require('moment');

const logSync = async function (id, identifyTable, identifyStatus) {
    if (identifyTable === 'user') {
        await LogSync.create({
            userId: id,
            status: identifyStatus
        });
    } else {
        await LogSync.create({
            employeeId: id,
            status: identifyStatus
        });

    }
}

const hoursofWork = (inTime, outTime) => {
    inTime = moment(inTime, 'HH:mm:ss');
    outTime = moment(outTime, 'HH:mm:ss');

    let hasil = inTime.valueOf() - outTime.valueOf();
    hasil = moment.utc(hasil).format('HH:mm:ss').split(':');

   return `${hasil[0]} Jam ${hasil[1]} Menit`;
}

module.exports = {logSync, hoursofWork};