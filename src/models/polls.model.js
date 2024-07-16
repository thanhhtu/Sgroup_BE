import pool from '../config/database.config';

class PollsModel {    
    async getPollByPollID(pollID) {
        try{
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM polls WHERE PollID = ?', [pollID]);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async getPollByUserID(userID, pollID) {
        try{
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM polls WHERE UserID = ? AND PollID = ?', [userID, pollID]);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async getOptsByPollID(pollID) {
        try{
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM options WHERE PollID = ?', [pollID]);
            connection.release();
            return rows;
        }catch(error){
            throw error;
        }
    }

    async getOptByOptID(optID){
        try{
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM options WHERE OptionID = ?', [optID]);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async getCreatorUserByOptID(optID){
        try{
            const rows = await this.getOptByOptID(optID);
            if(!rows){
                return false;
            }

            const pollId = rows.PollID; 

            console.log("poll: ", pollId);
            console.log("user: ", (await this.getPollByPollID(pollId)).UserID);

            const creatorUserID = (await this.getPollByPollID(pollId)).UserID;
            return creatorUserID;
        }catch(error){
            throw error;
        }
    }

    async getAll(){
        try{
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM polls');

            let result = [];
            for(let row of rows){
                result.push(await this.getDetailPoll(row.PollID));
            }

            connection.release();
            return result;
        }catch(error){
            throw error;
        }
    }

    async getDetailPoll(pollID){
        try{
            const pollRow = await this.getPollByPollID(pollID);

            const optRows = [];
            const rows = await this.getOptsByPollID(pollID);
            for(let row of rows){
                optRows.push(row.OptionName);
            }

            const result = {
                ...pollRow,
                'Options': optRows
            };

            return result;
        }catch(error){
            throw error;
        }
    }

    async insertPoll(newPoll) {
        try{
            const connection = await pool.getConnection();
            const pollQuery = `INSERT INTO polls (UserID, Title, CreatedAt) VALUES (?, ?, ?);`;
            const { userID, title, createdAt, options } = newPoll;
            const pollValue = [userID, title, createdAt];
            const result = await connection.query(pollQuery, pollValue);

            const pollID = result[0].insertId;
            options.forEach(async (opt) => {
                const optQuery = `INSERT INTO options (PollID, UserID, OptionName, CreatedAt) VALUES (?, ?, ?, ?);`;
                const optValue = [pollID, userID, opt, createdAt];
                await connection.query(optQuery, optValue);
            })

            connection.release();
            return true;
        }catch(error){
            throw error;
        }
    }

    async insertOpt(newOpt) {
        try{
            const connection = await pool.getConnection();
            const { pollID, userID, options, createdAt } = newOpt;

            options.forEach(async (opt) => {
                const query = `INSERT INTO options (PollID, UserID, OptionName, CreatedAt) VALUES (?, ?, ?, ?);`;
                const value = [pollID, userID, opt, createdAt];
                await connection.query(query, value);
            })

            connection.release();
            return true;
        }catch(error){
            throw error;
        }
    }

    async deletePoll(userID, pollID) {
        try{
            const connection = await pool.getConnection();

            const rows = await this.getOptsByPollID(pollID);
            for(let row of rows){
                await connection.query('DELETE FROM votes WHERE OptionID = ?;', [row.OptionID]);
            }

            await connection.query('DELETE FROM options WHERE PollID = ?;', [pollID]);

            await connection.query('DELETE FROM polls WHERE UserID = ? AND PollID = ?;', [userID, pollID]);

            connection.release();
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteOpt(userID, optID){
        try{
            const connection = await pool.getConnection();
            
            const creatorUserID = await this.getCreatorUserByOptID(optID);

            if(creatorUserID === userID || (await this.getOptByOptID(optID)).UserID === userID){
                await connection.query('DELETE FROM votes WHERE OptionID = ?;', [optID]);
            }

            let results;
            if(creatorUserID === userID){ //person did not create opt but created poll                
                results = await connection.query('DELETE FROM options WHERE OptionID = ?;', [optID]);
            }else{ //person created opt
                results = await connection.query('DELETE FROM options WHERE UserID = ? AND OptionID = ?;', [userID, optID]); 
            }

            connection.release();           
            return results[0].affectedRows;
        }catch(error){
            throw error;
        }
    }

    async updateOpt(newOpt){
        try{
            const connection = await pool.getConnection();
            const { optID, userID, optionName, updatedAt } = newOpt;

            const creatorUserID = await this.getCreatorUserByOptID(optID);
            if(creatorUserID === userID){ //person did not create opt but created poll
                const query = `UPDATE options SET OptionName = ?, UpdatedAt = ? WHERE OptionID = ?;`;
                const value = [optionName, updatedAt, optID];
                const results = await connection.query(query, value);

                connection.release();
                return results[0].affectedRows;
            }

            const query = `UPDATE options SET OptionName = ?, UpdatedAt = ? WHERE UserID = ? AND OptionID = ?;`; //person created opt
            const value = [optionName, updatedAt, userID, optID];
            const results = await connection.query(query, value);
            
            connection.release();
            
            return results[0].affectedRows;
        }catch(error){
            throw error;
        }
    }

    async checkVote(userID, optID){
        try{
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM votes WHERE UserID = ? AND OptionID = ?', [userID, optID]);
            connection.release();
            return rows;
        }catch(error){
            throw error;
        }
    }

    async insertVote(userID, optID){
        try{
            const connection = await pool.getConnection();
            await connection.query('INSERT INTO votes (UserID, OptionID) VALUES (?, ?);', [userID, optID]);
            connection.release();
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteVote(userID, optID){
        try{
            const connection = await pool.getConnection();
            await connection.query('DELETE FROM votes WHERE UserID = ? AND OptionID = ?', [userID, optID]);
            connection.release();
            return true;
        }catch(error){
            throw error;
        }
    }
}

export default new PollsModel()
