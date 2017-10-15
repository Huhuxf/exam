
var mysql = require('mysql');
var pool = global.pool;
if(!pool){
	pool = mysql.createPool({
		database:'exam',
		user:'root',
		password:'root'

	});
	global.pool = pool;
}



function getConnection(){
	return new Promise(function(reslove,reject){
		pool.getConnection(function(err,connection){
			if(!err){
				reslove(connection);
			}else{
				reject(err);
			}
		});
	});
}


function execute(sql){
	return new Promise(function(reslove,reject){
		var conn ;
		getConnection().then(function(connection){
			conn = connection;
			connection.query(sql,function(err,result){
				if(!err){
					reslove(result);
				}else{
					reject(err);
				}
			});
		}).catch(function(err){
			reject(err);
		}).finally(function(){
			if(conn){
              conn.release();
              console.log('success....');
            }
		});
	});
}




module.exports = {
	getConnection,
	execute
}