var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(3000, function () {
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

var BATCH_SIZE = 6;
var messages = [];
var userId = 0;

var connections = [];

// WebSocket server
wsServer.on('request', function (request) {

    function saveMessage(msg) {
        messages.unshift(msg);
    }

    var connection = request.accept(null, request.origin);

    console.log('a user connected');
    connection.sendUTF(JSON.stringify({type: 'connected', userId: userId}));

    connections.push(connection);

    sendBatch(0, userId++);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        // console.log(message);
        // console.log(JSON.stringify(message));
        var json = JSON.parse(message.utf8Data);
        switch (json.type) {
            case 'chat message':
                console.log('chat message, connections size = ' + connections.length);
                saveMessage(json);
                for (var i = 0; i < connections.length; i++) {
                    connections[i].sendUTF(JSON.stringify(json));
                }
                // io.emit('chat message', msg);
                break;
            case 'request batch':
                console.log('batch requested with offset = ' + json.count);
                sendBatch(json.count, json.userId);
        }
    });

    connection.on('close', function (connection) {
        console.log("close connection when we have " + connections.length);
        connections = connections.filter(function(x) {
            return x !== connection;
        });
        console.log("after closing " + connections.length);
    });

    function sendBatch(start, id) {
        console.log('messages size ' + messages.length);
        var messagesToSend = [];
        for (var i = start; messagesToSend.length < BATCH_SIZE && i < messages.length; i++) {
            messagesToSend.push(messages[i]);
        }
        console.log('batch size to send ' + messagesToSend.length);
        connection.sendUTF(JSON.stringify({type: 'batch', data: messagesToSend, userId: id}));
    }
});

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var express = require('express');

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

//

// app.use("/bower_components", express.static(__dirname + "/bower_components"));

// io.set('transports', ['xhr-polling']);
// io.on('connection', function(socket){
//     console.log('a user connected');
//     io.emit('connected', userId);

//     sendBatch(0, userId++);

//     socket.on('disconnect', function() {
//         console.log('user disconnected');
//     });

//     socket.on('chat message', function(msg) {
//         console.log('chat message');
//         saveMessage(msg);
//         io.emit('chat message', msg);
//     });

//     socket.on('request batch', function(offset, id) {
//         console.log('batch requested with offset = ' + offset);
//         sendBatch(offset, id);
//     });
// });

// http.listen(3000, function(){
//     console.log('listening on *:3000');
// });