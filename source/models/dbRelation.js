const Department = require('./department');
const Report = require('./report');
const Employee = require('./employee');

function dbRelation(){
    Department.hasMany(Employee, {foreignKey : 'deptId'});
    Employee.belongsTo(Department, {foreignKey : 'deptId'});
    
    Employee.hasMany(Report, {foreignKey: 'employeeId'});
    Report.belongsTo(Employee, {foreignKey : 'employeeId'});
}

module.exports = dbRelation;