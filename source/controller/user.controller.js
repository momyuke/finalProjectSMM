

const controlGetUser = async (req,res,services) => {
    const result = await services.getUserForLogin(req.body);
    res.send(result);
}

const controlCreateUser = async (req,res,services) => {
    const result = await services.createUser(req.body);
    res.send(result);
}

module.exports = {controlGetUser, controlCreateUser}