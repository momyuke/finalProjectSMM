const serviceWebSocket = function serviceWebSocket(wsServer){
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
}

module.exports = serviceWebSocket;