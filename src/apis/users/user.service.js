import pool from '../../config/database.config';

class UserService {
    async selectAll() {
        try{
            const [rows, fields] = await pool.query('SELECT * FROM users');
            return rows;
        }catch(error){
            console.error('Error executing query:', error);
        }
    }

    async selectDetail(userId) {
        try{
            const [rows, fields] = await pool.query('SELECT * FROM users WHERE UserID = ?', [userId]);
            return rows[0]; //array rows has only 1 element
        }catch(error){
            console.error('Error executing query:', error);
        }
    }

    async insertUser(newUser){
        try{
            const results = await pool.query('INSERT INTO users (Email, Pwd, Gender, Age) VALUES (?, ?, ?, ?)', [newUser.Email, newUser.Pwd, newUser.Gender, newUser.Age]);
            return results[0].insertId;
        }catch(error){
            console.error('Error executing query:', error);
        }
    }

    async updateUser(userId, newUser){
        try{
            const results = await pool.query('UPDATE users SET Email = ?, Pwd = ?, Gender = ?, Age = ? WHERE UserID = ?', [newUser.Email, newUser.Pwd, newUser.Gender, newUser.Age, userId]);
            return results[0].affectedRows;
        }catch(error){
            console.error('Error executing query:', error);
        }
    }

    async delUser(userId){
        try{
            const results = await pool.query('DELETE FROM users WHERE UserID = ?', [userId]);
            return results[0].affectedRows;
        }catch(error){
            console.error('Error executing query:', error);
        }
    }
}

export default new UserService();