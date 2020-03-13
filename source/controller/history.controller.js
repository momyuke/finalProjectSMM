
async function createHistory(req,res,services){
    const dataClient = req.body;
    const createData = await services.createHistory(dataClient);
    res.send(createData);
}

module.exports = {createHistory};