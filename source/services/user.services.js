const User = require('../models/user');
const bcrypt = require('bcrypt');
const logEvent = require('../event/myEmitter');
const LogSync = require('./sub-services');
const fs = require('fs');
const moment = require('moment');
const StatusLog = {'INSERT': 'INSERT', 'UPDATE' : 'UPDATE', 'DELETE': 'DELETE'};


class UserServices {

    async getAllUser(){
        let result;
        try {
            result = await User.findAll({where : {deleteAt : null}});
        } catch (e) {
            logEvent.emit('APP_ERROR',{
                logTitle : '[GET-ALL-USER-ERROR]',
                logMessage : e
            });

            throw new Error(e);
        }
        return result;
    }

    async getUserByEmail(user){
      let result;
      try {
         result = await User.findOne({where : {
             email : user.email,
             deleteAt : null
         }});
      } catch (e) {
          logEvent.emit('APP_ERROR',{
              logTitle : '[GET-USER-FOR-LOGIN-ERROR]',
              logMessage : e
          });
          throw new Error(e);

      }
      return result;   
    }

    async createUser(user, reqFile){
        let result;
        try{
            const checkData = await User.findOne({
                where : {email : user.email}
            });

            if(checkData){
                result = {message : 'Email that input have been registered. Please login with your email'}
                if(reqFile){
                    fs.unlinkSync(reqFile.path);
                }
            }else {
                user.password = bcrypt.hashSync(user.password, 8);
                if(!reqFile){
                    result = await User.create(user);
                    await LogSync(result.id, 'user', StatusLog.INSERT);
                }else {
                    user.photoUrl = "\\" + reqFile.path.slice(reqFile.path.indexOf('assets'));
                    result = await User.create(user);
                    await LogSync(result.id, 'user', StatusLog.INSERT);
                }
            }
        }catch(e){
            logEvent.emit('APP_ERROR',{
                logTitle : '[CREATE-USER-ERROR]',
                logMessage : e
            });
            throw new Error(e);
        }

        return result;
    }

    async updateUser(user, reqFile){
        let result;
        try {
            user.password = bcrypt.hashSync(user.password, 8);
            if(reqFile){
                const checkData = await User.findByPk(user.id);
                checkData.photoUrl !== null ? fs.unlinkSync(`.${checkData.photoUrl}`) : null; 
                user.photoUrl = "\\" + reqFile.path.slice(reqFile.path.indexOf('assets'));
            }
            const updateData = User.update(user, {
                where: {
                  id: user.id
                }
              });

            if(updateData){
                result = {message : 'Update user is successfully'}
                await LogSync(user.id, 'user', StatusLog.UPDATE);
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[UPDATE-USER-ERROR]',
                logMessage : e
            });
            throw new Error(e);
        }

        return result;
    }

    async deleteUser(user){
        try {
            const checkUser = await User.findOne({where : {id : user.id, deleteAt : null}});
            console.log(checkUser);
            if(checkUser === null){
                return {message : 'Data not found'}
            }else { 
                checkUser.deleteAt = moment().toISOString();
                checkUser.save();
                await LogSync(checkUser.id, 'user', StatusLog.DELETE)
                return {message  : 'Delete user is success'};
            }
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[DELETE-USER-ERROR]',
                logMessage : e
            });
            throw new Error(e);
        }
    }

}

module.exports = UserServices;