console.log('Hello world');

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.render('home');
});

app.get('/results',function(req,res){
  var dataSet = {'method': 'GET'};
  dataSet.data = [];
  for (var q in req.query) {
    dataSet.data.push({ 'name': q, 'value': req.query[q] });
  }
  res.render('results', dataSet);
});

app.post('/results',function(req,res){
  var dataSet = {'method': 'POST'};
  dataSet.data = [];
  for (var q in req.query) {
    dataSet.data.push({ 'name': q, 'value': req.query[q] });
  }

  dataSet.received = [];
  for (var q in req.body) {
    dataSet.received.push({ 'name': q, 'value': req.body[q] });
  }
  res.render('results', dataSet);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip1.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});