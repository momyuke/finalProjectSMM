
const moment = require('moment');


const date = new Date();
let datenow = Date(Date.now()).toString();
datenow = datenow.split(' ');




var teguh = '2020-03-16';
var test = moment().format('YYYY-MM-DD');
console.log(test);

const option = {hour12 : false}

console.log(date.toLocaleDateString());

console.log(date.toLocaleDateString());
