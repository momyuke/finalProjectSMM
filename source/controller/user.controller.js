const uploadFile = require('../middleware/fileHandler');

class UserController{
    async controlGetUser(req,res,services){
        try {
            let result;
            if(req.query.email){
                result = await services.getUserByEmail(req.query);
            }else {
                result = await services.getAllUser()
            }
            res.send(result);
        } catch (e) {
            res.status(500);
            res.json({message : e});
        }
    }

    async controlUpdateUser(req,res,services){
        try {
            const result = await services.updateUser(req.body);
            res.send(result);
        } catch (e) {
            res.status(500);
            res.json({message : e});
        }
    }

    async controlCreateUser(req,res,services){
        try {
            const result = await services.createUser(req.body, req.file);
            res.send(result);
        } catch (e) {
            res.status(500);
            res.json({message : e});
        }
    }

    async controlDeleteUser(req,res,services){
        try {
            const result = await services.deleteUser(req.body);
            if(result){
                
            }
            res.send(result);
        } catch (e) {
            res.status(500);
            res.json({message : e});
        }
    }

}





module.exports = UserController;