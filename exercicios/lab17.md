### <i class="icon-file"></i>Lab 17

#### <i class="icon-hdd"></i>  index.js

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
       

#### <i class="icon-hdd"></i>  index.html

        <!-- index.html -->
        <html>
        <head>
            <title>Chat Real-time</title>
            <script src="/socket.io/socket.io.js"></script>
            <script>
            var socket = io.connect('http://localhost');
            socket.on('toClient', function (msg) {
                document.getElementById('historico').innerHTML += msg;
            });
            var enviar = function(){
                var nome = document.getElementById('nome').value; 
                var msg = document.getElementById('mensagem').value;
                socket.emit('toServer', {nome: nome, msg: msg}); 
            };
            </script>
        </head>
        <body>
            <h1>Chat Real-time</h1>
            <label>Nome: 
            <input type="text" id="nome" size="3">
            </label>
            <label>Mensagem: 
            <input type="text" id="mensagem" size="10">
            </label>
            <button id="enviar" onclick="enviar();">Enviar</button>
            <hr>
            <div id="historico"></div>
        </body>
        </html>

#### <i class="icon-hdd"></i>  package.json

    {
    "name": "lab17",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
            "socket.io": "*"
        }
    }
  











