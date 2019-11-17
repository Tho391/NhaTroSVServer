var mysql = require('mysql');

var connection=mysql.createConnection({
      // host: 'localhost',
      // user: 'root',
      // password: '123456',
      // database: 'quanlynhatro'

      host: 'id11622526_quanlynhatro',
      user: 'id11622526_root',
      password: '5LDN9RK2YLFQGu',
      database: 'localhost'

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