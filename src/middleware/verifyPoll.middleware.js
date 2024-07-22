import pollsModel from '../models/polls.model';

class VerifyMiddleware {
    async verifyPollExist(req, res, next){
        try{
            const poll = await pollsModel.getPollByPollID(req.params.id);
            if(poll == null){
                return res.status(500).json({
                    success: false,
                    message: 'Poll does not exist',
                });
            }
            next();
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    
    async verifyPollCreator(req, res, next){
        try{
            const poll = await pollsModel.getPollByUserID(req.user.id, req.params.id);
            if(poll == null){
                return res.status(500).json({
                    success: false,
                    message: 'Poll was not created by you',
                });
            }
            next();
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new VerifyMiddleware()
