// É necessário instanciar os módulos abaixo nessa ordem!
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000, function() {
    console.log("Chat real-time...");
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

// Eventos do Socket.IO
io.sockets.on('connection', function(socket) {

    socket.on('toServer', function(data) {
        var msg = "<br/>" + data.nome + ":" + data.msg;
        socket.emit('toClient', msg);
        socket.broadcast.emit('toClient', msg);
    });
});