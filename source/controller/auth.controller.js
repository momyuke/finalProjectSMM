const AuthController = async (req,res,service) => {
    const dataFromClient = req.body;
    const Authentication = await service.authenticate(dataFromClient);
    res.send(Authentication);
}

module.exports = AuthController;