const dotenv = require('dotenv');
const connection = require('./dbConn');
const server = require('./server');
const logEvent = require('./source/event/myEmitter');
const WebSocketServer = require('websocket').server;

dotenv.config();
if(process.env.APP_NAME){
    connection.authenticate().then(() => {
        server.listen(process.env.APP_PORT, '0.0.0.0');
        if(server.listening){            
            logEvent.emit('APP_INFO', { 
                logTitle : '[SERVER-RUNNING]',
                logMessage : `Server has been running in port ${process.env.APP_PORT}`
            });
        }

        const wsServer = new WebSocketServer({
            httpServer : server
        });

        wsServer.on('request', function(request){
            const connection = request.accept(null, request.origin);
    
            connection.on('message', function(message){
                console.log('Receiver Message: ', message.utf8Data);
                connection.sendUTF('Hi this is WebSocket server!');
            });
    
            connection.on('close', function(reasonCode, description){
                console.log('client has been disconnected');
            });
        });
        
    }).catch((err) => {
        logEvent.emit('APP_ERROR', {
            logTitle : '[DB-ERROR]',
            logMessage : err
        });
    })
}else {
    process.exit(1);
}