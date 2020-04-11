const User = require('../models/user');
const bcrypt = require('bcrypt');
const logEvent = require('../event/myEmitter');
const LogSync = require('./sub-services');
const jwt = require('jsonwebtoken');

const StatusLog = {'INSERT': 'INSERT', 'UPDATE' : 'UPDATE'};

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
         const dataUser = await User.findOne({where : {
             email : user.email
         }});
         
         if(!dataUser){
             result = null
         }else {
            const token = jwt.sign({id : dataUser.id}, process.env.SECRET_KEY, {
                expiresIn : 10000
             });

             result = {
                dataUser, 
                token : token
             }
         }
      } catch (e) {
          logEvent.emit('APP_ERROR',{
              logTitle : '[GET-USER-FOR-LOGIN-ERROR]',
              logMessage : e
          });
      }
      return result;   
    }

    async createUser(user, reqFile){
        let result;
        try{
            const checkData = await User.findOne({
                where : {email : user.email}
            });

            console.log(checkData);
            if(checkData){
                result = {message : 'Email that input have been registered. Please login with your email'}
            }else {
                user.password = bcrypt.hashSync(user.password, 8);
                if(!reqFile){
                    result = await User.create(user);
                    await LogSync(result.id, 'user', StatusLog.INSERT);
                }else {
                    user.photoUrl = reqFile.path;
                    result = await User.create(user);
                    await LogSync(result.id, 'user', StatusLog.INSERT);
                }
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
                }});
                await logSync(result.id, 'user', StatusLog, StatusLog.UPDATE);
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