import 'dotenv/config'
import bcrypt from 'bcryptjs';

class HashService {
    async hashPassword(plainText){
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(plainText, salt);
        return {salt, hashedPassword};
    }

    async checkPassword(plainText, hash){
        
        return bcrypt.compareSync(plainText, hash);
    }
}

export default new HashService()
