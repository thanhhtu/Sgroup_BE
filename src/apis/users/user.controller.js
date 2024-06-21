import UserService from './user.service';

class UserController {
    async getAll(req, res, next) {
        const users = await UserService.selectAll();
        return res.json(users);
    }
    
    async getDetail(req, res, next){
        const user = await UserService.selectDetail(parseInt(req.params.id));
        if(!user){
            return res.send("User does not exist");
        }
        return res.json(user);
        
    }

    async postUser(req, res, next){
        const newUser = {
            Email: req.body.Email,
            Pwd: req.body.Pwd,
            Gender: req.body.Gender,
            Age: req.body.Age
        }

        const id = await UserService.insertUser(newUser);
        return res.json(await UserService.selectDetail(id));
    }

    async putUser(req, res, next){
        const newUser = {
            Email: req.body.Email,
            Pwd: req.body.Pwd,
            Gender: req.body.Gender,
            Age: req.body.Age
        }
        const id = parseInt(req.params.id)
        const num = await UserService.updateUser(id, newUser);
        if(num == 0){
            return res.send("User does not exist");
        }
        return res.json(await UserService.selectDetail(id));
    }

    async delUser(req, res, next){ 
        const id = parseInt(req.params.id)
        const num = await UserService.delUser(id);
        if(num == 0){
            return res.send("User does not exist");
        }
        return res.json(await UserService.selectAll());
    }
}

export default new UserController();