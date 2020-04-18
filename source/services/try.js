
const moment = require('moment');

// const array = [1,2,3,4,5]

// console.log(array.length);

let a = moment('08:06:31', 'HH:mm:ss');
let b = moment('23:01:32', 'HH:mm:ss');

let hasil = b.valueOf() - a.valueOf();
let hasilFinal = moment.utc(hasil).format('HH:mm:ss').split(':');

console.log(`${hasilFinal[0]} Jam ${hasilFinal[1]} Menit`);

const hoursofWork = (inTime, outTime) => {
    inTime = moment(inTime, 'HH:mm:ss');
    outTime = moment(outTime, 'HH:mm:ss');

    let hasil = outTime.valueOf() - inTime.valueOf();
    hasil = moment.utc(hasil).format('HH:mm:ss').split(':');

    console.log(`${hasil[0]} Jam ${hasil[1]} Menit`);
}

hoursofWork('08:06:31', '23:01:32');