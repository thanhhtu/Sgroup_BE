import pollsModel from '../../models/polls.model';

class PollsService{
    async getAll(){
        try{
            return await pollsModel.getAll();
        }catch(error){
            throw error;
        }
    }

    async getDetail(pollID){
        try{
            // return await pollsModel.getPollByPollID(pollID);
            return await pollsModel.getDetailPoll(pollID);
        }catch(error){
            throw error;
        }
    }

    async createPoll(newPoll){
        try{
            return await pollsModel.insertPoll(newPoll);
        }catch(error){
            throw error;
        }
    }

    async createOpt(newOpt){
        try{
            return await pollsModel.insertOpt(newOpt);
        }catch(error){
            throw error;
        }
    }

    async deletePoll(userID, pollID){
        try{
            return await pollsModel.deletePoll(userID, pollID);
        }catch(error){
            throw error;
        }
    }

    async deleteOpt(userID, optID){
        try{
            if(await pollsModel.getOptByOptID(optID) == null){
                throw new Error('This option does not exist')
            }
            const result = await pollsModel.deleteOpt(userID, optID);
            console.log(result);
            if(!result){
                throw new Error('Option or poll was not created by you');
            }

            return true;
        }catch(error){
            throw error;
        }
    }

    async updateOpt(newOpt){
        try{
            if(await pollsModel.getOptByOptID(newOpt.optID) == null){
                throw new Error('This option does not exist')
            }
            const result = await pollsModel.updateOpt(newOpt);
            console.log(result);
            if(!result){
                throw new Error('Option or poll was not created by you');
            }
            
            return true;
        }catch(error){
            throw error;
        }
    }

    async vote(userID, pollID, optID){
        try{
            const options = (await pollsModel.getOptsByPollID(pollID)).map((opt) => opt.OptionID);
            console.log(options, typeof(optID));
            if(options.includes(Number(optID))){
                const rows = await pollsModel.checkVote(userID, optID);
                if(rows.length){
                    throw new Error('You voted this option');
                }
                return await pollsModel.insertVote(userID, optID);
            }
            
            throw new Error('Poll does not have this option');
        }catch(error){
            throw error;
        }
    }

    async unVote(userID, pollID, optID){
        try{
            const options = (await pollsModel.getOptsByPollID(pollID)).map((opt) => opt.OptionID);
            console.log(options, typeof(optID));
            if(options.includes(Number(optID))){
                const rows = await pollsModel.checkVote(userID, optID);
                if(!rows.length){
                    throw new Error('You have not voted this option');
                }
                return await pollsModel.deleteVote(userID, optID);
            }
            
            throw new Error('Poll does not have this option');
        }catch(error){
            throw error;
        }
    }
}

export default new PollsService();
