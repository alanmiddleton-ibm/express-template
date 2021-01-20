const express = require('express');
const fs = require('fs');
const https = require('https');

let server;
const appPort = 8443;
const contextRoot = '/';
const app = express();

app.get('/**', (req, res) => {
  res.send('Hello World!');
});

function startupCallback() {
  const startupMessage =
    // eslint-disable-next-line no-template-curly-in-string
    `Express server started on https://localhost:${appPort}${contextRoot} started`;

  console.log(`Running on ${process.env.NODE_ENV} environment`);
  console.log(startupMessage);
}

if (
  process.env.NODE_ENV === 'LOCAL' ||
  process.env.NODE_ENV === undefined ||
  process.env.NODE_ENV === 'unit-test'
) {
  server = https
    .createServer(
      {
        key: fs.readFileSync('config/ssl/server.key'),
        cert: fs.readFileSync('config/ssl/server.cert'),
      },
      app,
    )
    .listen(appPort, startupCallback);
} else {
  server = app.listen(appPort, startupCallback);
}

module.exports = {
  app,
  server,
};
