

class ReportController{
    async controlCreateReport(req,res,services){
        const dataClient = req.body;
        const createData = await services.createNewReport(dataClient);
        res.send(createData);
    }

    async controlGetReport(req,res,services){
        const params = req.params;
        let getData;
        if(!params.employeeId){
            getData = await services.getAllReport();
        }else {
            getData = await services.getReportByEmployeeId(params);
        }
    
        res.send(getData);
    }

    async getReport (req,res,services){
        const params = req.params;
        let getData;
        if(!params.employeeId){
            getData = await services.getReportByDateNow();
        }else {
            getData = await services.getReportByDateNowAndEmployeeId(params);
        }
        res.send(getData);
    }
}





module.exports = ReportController;