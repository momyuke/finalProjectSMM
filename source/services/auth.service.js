const bcrypt = require('bcrypt');
const User = require('../models/user');
const logEvent = require('../event/myEmitter');
const axios = require('axios').default;

async function getRedisToken(dataUser) {
    let token = await axios.post('http://ec2-18-136-210-143.ap-southeast-1.compute.amazonaws.com:3333/token');
    console.log(token);
    if(!token){
        throw new Error ('Erorr at get redis');
    }
    return { user: dataUser, token: token.data.result }
}

class AuthLogin {
    async authenticateGoogleSignIn(user) {
        let result;
        try {
            const checkData = await User.findOne({ where: { email: user.email } });
            if (!checkData) {
                result = { message: 'Email is not valid', status: 401 };
            } else {
                result = getRedisToken(checkData);
            }
        } catch (e) {
            logEvent.emit('APP_INFO', {
                logTitle: 'GET-PRODUCT-SERVICE-FAILED',
                logMessage: err
            })

            throw new Error(err);
        }
        return result
    }


    async authenticate(user) {
        let userLogin;
        let result;

        try {
            userLogin = await User.findOne({ where: { email: user.email } });
            if (!userLogin) {
                result = { message: "Email is not valid", status: 401 };
            } else {
                const matchPassword = bcrypt.compareSync(user.password, userLogin.password);
                if (matchPassword) {
                    result = getRedisToken(userLogin);
                } else {
                    result = { message: "Password is wrong", status: 403 };
                }
            }
        } catch (err) {
            logEvent.emit('APP_INFO', {
                logTitle: 'GET-PRODUCT-SERVICE-FAILED',
                logMessage: err
            })

            throw new Error(err);
        }
        return result;
    }
}

module.exports = AuthLogin;
