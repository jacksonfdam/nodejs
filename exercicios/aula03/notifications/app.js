var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

// creating the server ( localhost:8000 ) 
app.listen(8000);

// on server started we can load our client.html page
function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading client.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {
    console.log(__dirname);
    // watching the xml file
    fs.watch(__dirname + '/data.txt', function(curr, prev) {
        // on file change we can read the new xml
        fs.readFile(__dirname + '/data.txt', "utf-8", function(err, data) {
            if (err) throw err;
            console.log(data);
            socket.volatile.emit('notification', data);
        });
    });
});