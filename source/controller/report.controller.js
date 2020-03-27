
const controlCreateReport = async (req,res,services) => {
    const dataClient = req.body;
    const createData = await services.createReportSync(dataClient);
    res.send(createData);
}

const controlGetReport = async (req,res,services) => {
    const dataQuery = req.query;
    const dataBody = req.body;
    let getData;
    if(dataQuery.date === 'datenow' && dataBody.employeeId){
        getData = await services.getReportByDateNowAndEmployeeId(dataBody)
    }else if(dataQuery.date === 'datenow'){
        getData = await services.getReportByDateNow();
    }else if(dataQuery.employeeId !== null){
        getData = await services.getReportByEmployeeId(dataQuery);
    }else if(dataBody !== null && dataQuery === null){
        getData = await services.getReportBySomeDate(dataBody);
    }else{
        getData = await services.getAllReport();
    }
    res.send(getData);
}



module.exports = {controlGetReport, controlCreateReport};