const date = new Date();
let datenow = Date(Date.now()).toString();
datenow = datenow.split(' ');


console.log(datenow[1]);
console.log(date.getMonth() + 1);