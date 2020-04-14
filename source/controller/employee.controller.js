class EmployeeController{
    
    async controlGetEmployee(req,res,services){
        try {
            if(req.query.firstName || req.query.lastName){
                const employeeByName = await services.getEmployeeByName(req.query);
                res.send(employeeByName)
            }else if(req.params.id){
                const employeeById = await services.getEmployeeById(req.params);          
                res.send(employeeById);    
            }else{
                  const employee = await services.getAllEmployee();
                  res.send(employee);
            }
        } catch (e) {
            res.status(500);
            res.json({message : e.message})
        }
    }

    async controlUpdateEmployee(req,res,services){
        try {
            const result = await services.updateEmployee(req.body, req.file);
            res.send(result);
        } catch (e) {
            res.status(500);
            res.json({message : e})
        }
        
    }

    async controlCreateEmployee (req,res,services){
        try {
            const result = await services.createEmployee(req.body, req.file);
            res.send(result);    
        } catch (e) {
            res.status(500);
            res.json({message : e})
        }
    
    }
}


module.exports = EmployeeController;