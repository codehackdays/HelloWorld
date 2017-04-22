var express = require('express');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var redis = require('redis');
var bodyParser = require('body-parser');

var app = express();

if (process.env.AUTH_ENABLED === 'true' ||
    process.env.AUTH_ENABLED === '1') {
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(bodyParser.json());

var _redis_client;
function redis_client() {
    if (_redis_client === undefined) {
        _redis_client = redis.createClient(process.env.REDIS_URL);
    }
    return _redis_client;
}

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
  redis_client().set(req.query.key, req.query.value, redis.print);
  res.send("");
});

app.get('/keys', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  redis_client().get(req.query.key, function (err, reply){
    if (err) { throw err; }
    var value = (reply === null ? null : reply.toString());
    res.send(JSON.stringify(value));
  });
});

app.get('/list', function (req, res) {
  redis_client().keys('*', function (err, reply) {
    if (err) { throw err; }
    var value = (reply === null ? null : reply.toString());
    res.send(JSON.stringify(value));
  });
});

/* Events: Get event*/

/* remove afterwards */
var events = [
  {
    "name": "Foo",
    "description": "This is a default event",
    "start": "2010-04-05T14:30Z",
    "end": "2010-04-05T15:30Z"
  }
];
app.post('/rotas/events', function(req,res) {
  console.log("Request ", req.body);
  events.push(req.body);
  res.send("Done");
});
app.get('/rotas/events', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(events));
});


app.listen(process.env.PORT || 3000);
