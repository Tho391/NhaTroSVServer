var express = require('express');
var bodyparser = require('body-parser');
  
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
  
var connection = require('./connection');
//var routes = require('./routes');

//connection.init();
//routes.configure(app);

//app.use('/api', require('./routes/api'));

// var abc=require('./Models/NhaTro')
// var xyz=abc.getAllpost();

app.use('/api', require('./api'));

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});