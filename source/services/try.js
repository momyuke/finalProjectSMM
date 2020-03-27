
const moment = require('moment');


const date = new Date();
let datenow = Date(Date.now()).toString();
datenow = datenow.split(' ');


const report = {
    time : '2020-12-26 20:45:02.480'
};

let checkHour = report.time;

report.time = moment(report.time).format('dddd, D MMM YYYY HH:mm:ss');
checkHour = moment(checkHour).hours();

console.log(checkHour);
console.log(report.time.length);

var teguh = '2020-03-16';
var test = moment().hours();
console.log(test);

