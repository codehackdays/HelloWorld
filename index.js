var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/sayhello', function (req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({message: "Hello " + req.query.name}));
});

app.listen(process.env.PORT || 3000);
