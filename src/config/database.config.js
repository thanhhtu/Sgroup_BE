import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sgroupbe',
	port: 3306
});

pool.getConnection(function (err, conn) {
	if(err){
		console.error('error');
	}else{
		console.log('oke');
	}
}); 

export default pool;