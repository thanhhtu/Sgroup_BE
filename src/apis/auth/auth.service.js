import usersModel from '../../models/users.model';
import userIdentityService from '../../service/authentication.service';
import hashService from '../../service/hash.service';

class AuthService{
    async register(registerInfo){
        try {
            const user = await usersModel.getUserByEmail(registerInfo.email);
            if(user != null){
                return false;
            }
            
            const hashObj = await hashService.hashPassword(registerInfo.password);
            registerInfo.password = hashObj.hashedPassword;
            await usersModel.createUserSalt(registerInfo, hashObj.salt);
            return true;
        }catch(error){
            throw new Error('Internal Service Error');
        }
    }

    async login(loginInfo){
        try {
            const user = await usersModel.getUserByEmail(loginInfo.email);
            if(user == null){
                return false;
            }
            const check = await hashService.checkPassword(loginInfo.password, user.Pwd);
            if(!check){
                return false;
            }  

            const token = await userIdentityService.encodeToken(user);
            return token;
        }catch(error){
            // throw error;
            throw new Error('Internal Service Error');
        }
    }
}

export default new AuthService();