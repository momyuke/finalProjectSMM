const Department = require('./department');
const Report = require('./report');
const Employee = require('./employee');
const User = require('./user');
const LogSync = require('./logSync');

function dbRelation(){
    Department.hasMany(Employee);
    Employee.belongsTo(Department);
    
    User.hasMany(LogSync);
    Employee.hasMany(LogSync);

    LogSync.belongsTo(User);
    LogSync.belongsTo(Employee);

    Employee.hasMany(Report);
    Report.belongsTo(Employee);
}

module.exports = dbRelation;