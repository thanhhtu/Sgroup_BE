import authService from './auth.service';

class AuthController {
    async getMe(req, res, next) {
        try {
            return res.json({
                success: true,
                message: req.user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async register(req, res, next){
        try{
            const {email, password, gender, age} = req.body;

            const check = await authService.register({email, password, gender, age});
            
            if(check){
                return res.status(201).json({
                    success: true,
                    message: 'Created user'
                });
            }

            return res.status(409).json({
                success: false,
                message: 'Email already exist'
            });
            
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req, res, next){
        try{
            const {email, password} = req.body;
            const token = await authService.login({email, password});
            
            if(token){
                console.log('token: ', token)
                return res.status(200).json({
                    success: true,
                    message: token
                });
            }
            
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new AuthController();