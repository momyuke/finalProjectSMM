

class LogsyncController {
    async getLogSyncControl(req,res,services){
        const result = await services.getLogSync();
        res.send(result);
    }
}

module.exports = LogsyncController;