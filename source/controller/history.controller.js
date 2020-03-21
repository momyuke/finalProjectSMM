
const controlCreateHistory = async (req,res,services) => {
    const dataClient = req.body;
    const createData = await services.createHistorySync(dataClient);
    res.send(createData);
}

const controlGetHistory = async (req,res,services) => {
    const dataClient = req.params;
    let getData;
    if(dataClient.route === 'datenow'){
        getData = await services.getHistoryByDateNow(dataClient);
    }else if(dataClient.route){
        getData = await services.getHistoryByEmployeeId(dataClient);
    }else{
        getData = await services.getAllHistory();
    }
    res.send(getData);
}



module.exports = {controlGetHistory, controlCreateHistory};