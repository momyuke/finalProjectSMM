const axios =require('axios');

const tokenValidation = async (req,res,next)=>{
    const { authorization } = req.headers;
    
    if(authorization){
        if(authorization.startsWith('Bearer ')){
            const token = authorization.slice(7, authorization.length);
            let validate = await axios.get(`http://ec2-18-136-210-143.ap-southeast-1.compute.amazonaws.com:3333/token/validate?t=${token}`);
            if(validate.data.status === 'Token Invalid'){
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