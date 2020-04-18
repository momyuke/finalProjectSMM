

class LogsyncController {
    async getLogSyncControl(req,res,services){
        try {
            const result = await services.getLogSync(req.params);
            res.send(result);            
        } catch (e) {
            res.status(500);
            res.json(e.message);
        }
    }

    async getDumpInit(req,res,services){
        try {
            if(req.query.secretkey){
                const result = await services.dumpDataInit(req.query.secretkey);
                if(result.status){
                    res.sendStatus(result.status);
                }else{
                    res.send(result);
                }
            }else{
                res.sendStatus(401)
            }
        } catch (e) {
            res.status(500);
            res.json(e.message);
        }
    }
}

module.exports = LogsyncController;