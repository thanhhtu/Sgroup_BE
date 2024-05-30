import fs from 'fs';

const FileName = './data.json';
class UserService {
    getUsers() {
        const data = fs.readFileSync(FileName, 'utf-8');
        return JSON.parse(data);
    }

    setUsers(users){
        fs.writeFileSync(FileName, JSON.stringify(users));
    }
}

export default new UserService();