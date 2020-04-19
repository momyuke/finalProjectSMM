const moment = require('moment');
let waktu = moment().add(7, 'days')
const momentTz = require('moment-timezone');


console.log(waktu);
console.log(momentTz.tz(waktu, "Asia/Jakarta"));