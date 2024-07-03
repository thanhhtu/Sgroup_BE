import usersModel from '../../models/users.model';

class UsersService{
    async getUsers(){
        try {
            const users = await usersModel.getUsers();
            return users;
        }catch(error){
            throw error;
        }
    }

    async getDetailUser(userId){
        try {
            const user = await usersModel.getDetailUser(userId);
            return user;
        }catch(error){
            throw error;
        }
    }
    
    async createUser(user){
        try {
            await usersModel.createUser(user);
            return true;
        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, user){
        try {
            await usersModel.updateUser(userId, user);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try {
            await usersModel.deleteUser(userId);
            return true;
        }catch(error){
            throw error;
        }
    }
}
export default new UsersService();