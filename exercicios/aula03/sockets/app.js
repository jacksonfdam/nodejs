// Require HTTP module (to start server) and Socket.IO
var http = require('http'),
    fs = require('fs'),
    io = require('socket.io');

// Start the server at port 8080
var server = http.createServer(function(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, html) {
        res.writeHeader(200, {
            'Content-Type': 'text/html'
        });
        res.write(html);
        res.end();
    });
});
server.listen(8080);

// Create a Socket.IO instance, passing it our server
var socket = io.listen(server);

// Add a connect listener
socket.on('connection', function(client) {

    // Success!  Now listen to messages to be received
    client.on('message', function(event) {
        console.log('Received message from client!', event);
    });
    client.on('disconnect', function() {
        clearInterval(interval);
        console.log('Server has disconnected');
    });

    // Create periodical which ends a message to the client every 5 seconds
    var interval = setInterval(function() {
        client.send('This is a message from the server!  ' + new Date().getTime());
    }, 5000);
});