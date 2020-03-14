
async function createHistory(req,res,services){
    const dataClient = req.body;
    const createData = await services.createHistory(dataClient);
    res.send(createData);
}

async function getHistory(req,res,services){
    const dataClient = req.params;
    const getData = await services.getHistoryByEmployeeId(dataClient);
    res.send(getData);
}

module.exports = {createHistory, getHistory};