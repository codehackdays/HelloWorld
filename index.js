var express = require('express');
var app = express();

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

if (process.env.AUTH_ENABLED == 'true' ||
    process.env.AUTH_ENABLED == '1') {
    var jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: "https://codehackdays.eu.auth0.com/.well-known/jwks.json"
        }),
        audience: 'https://codehackdays-helloworld.herokuapp.com/',
        issuer: "https://codehackdays.eu.auth0.com/",
        algorithms: ['RS256']
    });

    app.use(jwtCheck);
}

var redis = require('redis');
var redis_client = redis.createClient(process.env.REDIS_URL);

app.get('/', function (req, res){
  res.send('hello world');
});

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.get('/sayhello', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({message: "Hello " + req.query.name}));
});

app.post('/keys', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  redis_client.set(req.query.key, req.query.value, redis.print);
  res.send("");
});

app.get('/keys', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  redis_client.get(req.query.key, function (err, reply){
    if (err) { throw err; }
    var value = (reply === null ? null : reply.toString());
    res.send(JSON.stringify(value));
  });
});

app.get('/list', function (req, res) {
  redis_client.keys('*', function (err, reply) {
    if (err) { throw err; }
    var value = (reply === null ? null : reply.toString());
    res.send(JSON.stringify(value));
  });
});

app.listen(process.env.PORT || 3000);
