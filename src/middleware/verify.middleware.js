// import usersModel from '../../models/users.model';
import userIdentityService from '../service/authentication.service'
import 'dotenv/config'

class VerifyMiddleware {
    async checkAuth(req, res, next) {
        try {
            let token = req.headers.authorization;
            console.log(token);
            
            token = token.split(' ')[1];
            if (!token) {
                return res.json('Not login yet');
            }

            req.user = await userIdentityService.decodeToken(token);
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new VerifyMiddleware()
