const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const routes = require('./source/routes/base');
const logEvent = require('./source/event/myEmitter');
const loggingListener = require('./source/event/loggingListener');
const middleware = require('./source/middleware/app-middleware');

dotenv.config();
loggingListener();
app.use(middleware);
app.use(routes);

const server = http.createServer(app);

server.on('error', (err) => {
    logEvent.emit('APP_ERROR'), {
        logTitle: '[SERVER ERROR]',
        logMessage: err
    }
});

module.exports = server;
