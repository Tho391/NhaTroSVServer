var mysql = require('mysql');

var connection=mysql.createConnection({
      // host: 'localhost',
      // user: 'root',
      // password: '123456',
      // database: 'quanlynhatro'

      host: 'den1.mysql1.gear.host',
      user: 'quanlynhatro1',
      password: 'Xs040rFRP5?-',
      database: 'quanlynhatro1'

});

//connection.connect();

connection.connect(function(err) {
  if (err)
  {
     throw err;
  }
  console.log("Connected!");
});

function getConnection(){
  if(!connection){
    connection.connect();
  }
  return connection;
}

module.exports={
  getConnection: getConnection
}