

class ReportController{
    async controlCreateReport(req,res,services){
       try {
           let createData;
            // let listTime = [];
            if(req.body.dataReport){
                 createData = await services.createListReport(req.body.dataReport);
            }else {
                createData = await services.createOneReport(req.body);
            }
            // dataClient.dataReport.forEach((data) => {
            //     listTime.push(data.time);
            // });
            res.send(createData);
       } catch (e) {
            res.status(500);
            res.json({message : e});
       }
    }

    async controlGetReport(req,res,services){
        try {
            let getData;
            if(req.params.id){
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
            if(!params.id){
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