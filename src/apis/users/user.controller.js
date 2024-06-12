import UserService from './user.service';

class UserController {
    getAll(req, res, next) {
        const users = UserService.getUsers();
        return res.send(users);
    }
    
    getDetail(req, res, next){
        const users = UserService.getUsers();
        const index = users.findIndex(user => user.id === parseInt(req.params.id));
        
        if(index == -1){
            res.send("The id does not exist!");
            return;
        }

        const detailUser = users.find(user => user.id === parseInt(req.params.id));
        return res.send(detailUser);        
    }

    postUser(req, res, next){
        const users = UserService.getUsers();
        const newUser = req.body;

        if(users.find(user => user.id === newUser.id)){
            res.send("The id of req already exists!");
            return;
        }

        users.push(newUser);
        UserService.setUsers(users);     

        return res.send(users);
    }

    putUser(req, res, next){
        const users = UserService.getUsers();
    
        const index = users.findIndex(user => user.id === parseInt(req.params.id))
        if(index == -1){
            res.send("The id does not exist!");
            return;
        }
    
        const newUser = req.body;
        users[index] = newUser;
        UserService.setUsers(users);     

        return res.send(users);
    }

    delUser(req, res, next){ 
        const users = UserService.getUsers();
    
        const index = users.findIndex(user => user.id === parseInt(req.params.id))
        if(index == -1){
            res.send("The id does not exist!");
            return;
        }
    
        users.splice(index, 1); 
        UserService.setUsers(users);     

        return res.send(users);
    }
}

export default new UserController();