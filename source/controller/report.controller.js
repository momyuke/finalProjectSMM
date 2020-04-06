

class ReportController{
    async controlCreateReport(req,res,services){
       try {
            const dataClient = req.body;
            const createData = await services.createNewReport(dataClient);
            res.send(createData);
       } catch (e) {
            res.status(500);
            res.json({message : e});
       }
    }

    async controlGetReport(req,res,services){
        try {
            let getData;
            if(req.params.employeeId){
                getData = await services.getReportByEmployeeId(req.params);
            }else if(req.query.dateReport){
                getData = await services.getReportBySomeDate(req.query);
            }else {
                getData = await services.getAllReport();
            }
        
            res.send(getData);
        } catch (e) {
            res.status(500);
            res.json({message : e});
        }
    }

    async getReport (req,res,services){
        try {
            const params = req.params;
            let getData;
            if(!params.employeeId){
                getData = await services.getReportByDateNow();
            }else {
                getData = await services.getReportByDateNowAndEmployeeId(params);
            }
            res.send(getData);
        } catch (e) {
            res.status(500);
            res.json({message : e});
        }
    }
}





module.exports = ReportController;