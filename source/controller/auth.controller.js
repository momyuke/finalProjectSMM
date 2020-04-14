const AuthController = async (req, res, service) => {
    try {
        const dataFromClient = req.body;
        const Authentication = await service.authenticate(dataFromClient);

        if (Authentication.message) {
            res.status(Authentication.status);
            res.json({message : Authentication.message});
        } else {
            res.send(Authentication);

        }
    } catch (e) {
        res.status(500);
        res.json(e);
    }

}

module.exports = AuthController;