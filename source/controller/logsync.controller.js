

class LogsyncController {
    async getLogSyncControl(req,res,services){
        const result = await services.getLogSync(req.params);
        res.send(result);
    }
}

module.exports = LogsyncController;