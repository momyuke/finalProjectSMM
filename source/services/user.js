const User = require('../models/user');
const logEvent = require('../event/myEmitter');

class UserServices {

    async getUserForLogin(user){
      let result;
      try {
         result = await User.findOne({where : {
             username : user.username, password : user.password
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
            result = await User.create(user);
        }catch(e){
            logEvent.emit('APP_ERROR',{
                logTitle : '[CREATE-USER-ERROR]',
                logMessage : e
            });
        }

        return result;
    }


}