var cluster = require('cluster');

if (cluster.isMaster) {
  return require('./master');
}

var enableDestroy = require('server-destroy');
var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
  res.send('ha fsdgfds gfds gfd!');
});

app.get('/boom', function (req, res) {
  process.exit(1);
  res.send('a');
});

var server = http.createServer(app).listen(8080, function () {
  console.log('http://localhost:8080');
});

enableDestroy(server);

process.on('SIGTERM', function () {
  console.log('got SIGTERM, exiting.');
  server.destroy(function () {
    console.log('exit');
    process.exit(0);
  });
});