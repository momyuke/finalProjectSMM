const User = require('../models/user');
const logEvent = require('../event/myEmitter');

class UserServices {

    async getAllUser(){
        let result;
        try {
            result = await User.findAll();
        } catch (e) {
            logEvent.emit('APP_ERROR',{
                logTitle : '[GET-ALL-USER-ERROR]',
                logMessage : e
            });
        }
        return result;
    }

    async getUserByEmail(user){
      let result;
      try {
         result = await User.findOne({where : {
             email : user.email
         }});
      } catch (e) {
          logEvent.emit('APP_ERROR',{
              logTitle : '[GET-USER-FOR-LOGIN-ERROR]',
              logMessage : e
          });
      }
      return result;   
    }

    async createUser(user){
        let result;

        try{
            const checkData = await User.findOne({
                where : {email : user.email}
            });

            if(checkData){
                result = {message : 'Email that input have been registered. Please login with your email'}
            }else {
                result = await User.create(user);
            }
        }catch(e){
            logEvent.emit('APP_ERROR',{
                logTitle : '[CREATE-USER-ERROR]',
                logMessage : e
            });
        }

        return result;
    }

    async updateUser(user){
        let result;

        try {
            const updateData = await User.update(user, {where: {
                email : user.email
            }});

            if(updateData){
                result = await User.findOne({where: {
                    email : user.email
                }})
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[UPDATE-USER-ERROR]',
                logMessage : e
            });
        }

        return result;
    }



}

module.exports = UserServices;