import pollsService from './polls.service';

class PollsController {
    async getAll(req, res, next){
        try{
            const result = await pollsService.getAll();
            return res.status(200).json({
                success: true,
                message: result
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getDetail(req, res, next){
        try{
            const pollID = req.params.id;
            const result = await pollsService.getDetail(pollID);
            if(result){
                return res.status(200).json({
                    success: true,
                    message: result
                });
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createPoll(req, res, next) {
        try{
            const newPoll = {
                userID: req.user.id,
                title: req.body.title,
                createdAt: new Date(Date.now()),
                options: req.body.options
            };
            await pollsService.createPoll(newPoll);
            return res.status(200).json({
                success: true,
                message: 'Created poll successfully'
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createOpt(req, res, next) {
        try {
            const newOpt = {
                pollID: req.params.id,
                userID: req.user.id,
                options: req.body.options,
                createdAt: new Date(Date.now())
            };
            
            const result = await pollsService.createOpt(newOpt);
            if(result){
                return res.status(200).json({
                    success: true,
                    message: 'Created options successfully'
                });
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async deletePoll(req, res, next) {
        try {
            const userID = req.user.id;
            const pollID = req.params.id;
            const result = await pollsService.deletePoll(userID, pollID);
            if(result){
                return res.status(200).json({
                    success: true,
                    message: 'Deleted poll successfully'
                });
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteOpt(req, res, next) {
        try {
            const userID = req.user.id;
            const optID = req.params.id;
            const result = await pollsService.deleteOpt(userID, optID);
            if(result){
                return res.status(200).json({
                    success: true,
                    message: 'Deleted opt successfully'
                });
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateOpt(req, res, next) {
        try {
            const newOpt = {
                optID: req.params.id,
                userID: req.user.id,
                optionName: req.body.optionName,
                updatedAt: new Date(Date.now())
            };
            
            const result = await pollsService.updateOpt(newOpt);
            if(result){
                return res.status(200).json({
                    success: true,
                    message: 'Updated opt successfully'
                });
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async vote(req, res, next){
        try {
            const userID = req.user.id;
            const pollID = req.params.id;
            const optID = req.params.optId;
            console.log(userID, pollID, optID);
            const result = await pollsService.vote(userID, pollID, optID);

            if(result){
                return res.status(200).json({
                    success: true,
                    message: 'Vote successfully'
                });
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async unVote(req, res, next){
        try {
            const userID = req.user.id;
            const pollID = req.params.id;
            const optID = req.params.optId;
            console.log(userID, pollID, optID);
            const result = await pollsService.unVote(userID, pollID, optID);

            if(result){
                return res.status(200).json({
                    success: true,
                    message: 'Un-vote successfully'
                });
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new PollsController();
