class DepartmentController{
    async controlGetDepartment(req,res,services){
        try {
            const getData = await services.getAllDepartment();
            res.send(getData);    
        } catch (e) {
            res.status(500);
            res.json({message: e});
        }
        
    }
    
    async controlCreateDepartment(req,res,services){
        try {
            const getData = await services.getAllDepartment();
            res.send(getData);
        } catch (e) {
            res.status(500);
            res.json({message: e});
        }
        
    }
    
    async controlCreateDepartment(req,res,services){
        try {
            const dataBody = req.body;
            const createData = await services.createDepartment(dataBody);
            res.send(createData);
        } catch (e) {
            res.status(500);
            res.json({message: e});
        }
        
    }

    async controlUpdateDepartment(req,res,services){
        try {
            const dataBody = req.body;
            const updateData = await services.updateDepartment(dataBody);
            res.send(updateData);
        } catch (e) {
            res.status(500);
            res.json({message: e});
        }

    }
}




module.exports = DepartmentController;