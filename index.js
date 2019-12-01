var express = require('express');
var bodyparser = require('body-parser');
var router= express.Router();

var app = express();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(bodyparser.json({ type: 'application/*+json' })); 

var connection = require('./connection');
//var routes = require('./routes');

//connection.init();
//routes.configure(app);

//app.use('/api', require('./routes/api'));

// var abc=require('./Models/NhaTro')
// var xyz=abc.getAllpost();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', require('./api'));

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on port ' + server.address().port);
});