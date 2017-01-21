var express = require('express');
var app = express();
var redis = require('redis').createClient(process.env.REDIS_URL);

console.log(process.env.REDIS_URL);

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/sayhello', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({message: "Hello " + req.query.name}));
});

app.listen(process.env.PORT || 3000);
