

class AuthController {
    async authNormal  (req, res, service) {
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

    async authGoogleSignIn(req,res,service){
        try {
            if(req.query.email){
                const result = await service.authenticateGoogleSignIn(req.query);
                if(result.status){
                    res.status(result.status);
                    res.json(result.message);
                }else{
                    res.send(result);
                }
            }else {
                res.sendStatus(401);
            }
        } catch (e) {
            res.status(500);
            res.json(e.message);
        }
    }
}

module.exports = AuthController;