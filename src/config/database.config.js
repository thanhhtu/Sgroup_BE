import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sgroupbe',
	port: 3306
});

<<<<<<< HEAD
pool.getConnection(function (err, conn) {
	if(err){
		console.error('error');
	}else{
		console.log('oke');
	}
}); 

=======
>>>>>>> ba34e9e9e1ef82e4717e1c67dff307b529ee1943
export default pool;