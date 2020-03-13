

const getDataEmployee = async (req,res,services) => {
    if(req.query.id){
      const employeeById = await services.getEmployeeById(req.query.id);
      res.send(employeeById);
    }else{
        const employee = await services.getEmployee();
        console.log(employee);
        res.send(employee);
    }
}

module.exports = {getDataEmployee};