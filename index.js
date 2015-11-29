var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var app = express();

var PORT = process.env.PORT || 3000,
    ENV  = process.env.NODE_ENV;

// app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(stylus.middleware({src: __dirname + '/public', force: true}));
app.set('views', __dirname + '/public');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
  res.render('main');
});

var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});