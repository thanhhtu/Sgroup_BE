import pool from '../config/database.config';

class UsersModel {
    /* 
    //nếu không khởi tạo đối tượng bên export thì phải thêm constructor
    constructor(){
        this.database = new pool();
    }
    */

    async getUsers() {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM users');
        connection.release();
        return rows;
    }

    async getDetailUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE UserID = ?`; //? avoid sql injection
            const value = [userId];
            const [rows, fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async createUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (Email, Pwd, Gender, Age) VALUES (?, ?, ?, ?);`;
            const {Email, Pwd, Gender, Age} = user;
            const value = [Email, Pwd, Gender, Age];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET Email = ?, Pwd = ?, Gender = ?, Age = ? WHERE UserID = ?`;
            const {Email, Pwd, Gender, Age} = user;
            const value = [Email, Pwd, Gender, Age, userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE UserID = ?`;
            const value = [userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async getUserByEmail(email) {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE Email = ?`;
            const value = [email];
            const [rows, fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async setPasswordToken(passwordResetToken, passwordResetExpiration, email){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET PasswordResetToken = ?, PasswordResetExpiration = ? WHERE Email = ?`;
            const value = [passwordResetToken, passwordResetExpiration, email];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async checkTokenPassword(email, passwordResetToken){
        try{
            const connection = await pool.getConnection()
            const query = `SELECT * FROM users WHERE Email = ? AND PasswordResetToken = ? AND PasswordResetExpiration >= ?`;
            const value = [email, passwordResetToken, new Date(Date.now())];
            const [rows, fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async resetPassword(newHashedPassword, passwordLastResetDate, email){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET Pwd = ?, PasswordResetToken = NULL, PasswordResetExpiration = NULL, PasswordLastResetDate = ? WHERE Email = ?`;
            const value = [newHashedPassword, passwordLastResetDate, email];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }
}

export default new UsersModel()
