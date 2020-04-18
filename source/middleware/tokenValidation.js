const jwt = require('jsonwebtoken');
const rp =require('request-promise');

const tokenValidation = async (req,res,next)=>{
    const { authorization } = req.headers;
    
    if(authorization){
        if(authorization.startsWith('Bearer ')){
            const token = authorization.slice(7, authorization.length);
            let validate = await rp.get(`http://ec2-18-136-210-143.ap-southeast-1.compute.amazonaws.com:3333/token/validate?t=${token}`);
            validate = JSON.parse(validate);
            console.log(validate);
            if(validate.status === 'Token Invalid'){
                res.sendStatus(401)
            }else{
                next();
            }
        }else{
            res.sendStatus(401);
        }
    }else{
        res.sendStatus(401);
    }
}

module.exports = tokenValidation;