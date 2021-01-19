'use strict';

var express       = require('express');
var fs		  = require('fs');
var https	  = require('https');

var server;
var appPort = 8443;
var contextRoot = "/";
var app = express();

app.get('/**', (req, res) => {
  res.send('Hello World!')
})

function startupCallback() {
  console.log('### Running on %s environment ###', process.env.NODE_ENV);

  var startupMessage = 'Express server started on https://localhost' + ':' + appPort + contextRoot + ' started';

  console.log(startupMessage);
}

if (process.env.NODE_ENV === 'LOCAL' ||
  process.env.NODE_ENV === undefined ||
  process.env.NODE_ENV === 'unit-test') {
  server = https.createServer({
    key: fs.readFileSync('config/ssl/server.key'),
    cert: fs.readFileSync('config/ssl/server.cert')
  }, app).listen(appPort, startupCallback);
} else {
  server = app.listen(appPort, startupCallback);
}

module.exports = {
  app: app,
  server: server
};
