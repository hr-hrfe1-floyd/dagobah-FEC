const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const path = require('path');
const github = require('./config');

const app = express();

// create an options variable for the proxy
// whenever you send a request to the '/api' endpoint it automatically gets routed to the API server
const options = {
  target: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe',
  changeOrigin: 'true',
  headers: {
    'Authorization': github.token
  },
  pathRewrite: {
    '^/api/': '/'
  },
  logLevel: 'error',
};
// create the proxy
const proxy = createProxyMiddleware(options);
// middleware
// use the proxy and create the '/api' endpoint that communicates with our actual API
app.use('/api/**', proxy);
// set up body-parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, '/../client/dist/')));

app.get('*', (req, res) => {
  res.sendFile((path.join(__dirname, '../client/dist/index.html')));
});

module.exports = app;
