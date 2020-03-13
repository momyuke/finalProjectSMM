const History = require('../models/history');
const date = new Date();
const logEvent = require('../event/myEmitter');
const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` ;

class HistoryClass{
    

    async createHistory(employeeId){
        let result;
        try {
            result = await History.create({
                employeeId: employeeId.employeeId,
                in: Date.now()
            });
        } catch (e) {
          logEvent.emit('APP_ERROR',{
              logTitle: '[CREATE-HISTORY-ERROR]',
              logMessage: e
          });
        }
        return result;
    }
}

module.exports = HistoryClass;