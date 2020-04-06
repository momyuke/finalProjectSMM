
class EmployeeController{
    async controlGetEmployee(req,res,services){
        if(req.query.firstName || req.query.lastName){
            const employeeByName = await services.getEmployeeByName(req.query);
            res.send(employeeByName)
          }else{
              const employee = await services.getEmployee();
              res.send(employee);
          }
    }

    async controlUpdateEmployee(req,res,services){
        const result = await services.updateEmployee(req.body);
        res.send(result);
    }

    async controlCreateEmployee (req,res,services){
        const result = await services.createEmployee(req.body);
        res.send(result);
    }
}


module.exports = EmployeeController;