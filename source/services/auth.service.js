const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logEvent = require('../event/myEmitter');


class AuthLogin {
    async authenticate(user) {
        let userLogin;
        let result;

        try {
            userLogin = await User.findOne({ where: { email: user.email } });
            if (!userLogin) {
                result = null;
            } else {
                const matchPassword = bcrypt.compareSync(user.password, userLogin.password);
                if (matchPassword) {
                    const expiresIn = 10000;
                    const accessToken = jwt.sign({ id: userLogin.id }, process.env.SECRET_KEY, {
                        expiresIn: expiresIn
                    });
                    result = {
                        userLogin,
                        token: accessToken
                    }
                } else {
                    result = null;
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
