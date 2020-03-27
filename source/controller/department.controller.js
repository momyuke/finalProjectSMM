const controlGetDepartment = async (req,res,services) => {
    const getData = await services.getAllDepartment();
    res.send(getData);
}

const controlCreateDepartment = async (req,res,services) => {
    const dataBody = req.body;
    const createData = await services.createDepartment(dataBody);
    res.send(createData);
}

const controlUpdateDepartment = async (req,res,services) => {
    const dataBody = req.body;
    const updateData = await services.updateDepartment(dataBody);
    res.send(updateData);
}


module.exports = {controlCreateDepartment, controlGetDepartment, controlUpdateDepartment}