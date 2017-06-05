### <i class="icon-file"></i>Lab 18

#### <i class="icon-hdd"></i> index.js

    var express = require('express')
	, http = require('http')
	, app = express()
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);

    server.listen(8080);

    app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    });

    var usuarios = {};

    var salas = ['sala1','sala2','sala3'];

    io.sockets.on('connection', function (socket) {
        
        socket.on('entrar', function(usuario){
            socket.usuario = usuario;
            socket.sala = 'sala1';
            usuarios[usuario] = usuario;
            socket.join('sala1');
            socket.emit('atualizarMensagens', 'Servidor', 'voce entrou na sala1');
            socket.broadcast.to('sala1').emit('atualizarMensagens', 'Servidor', usuario + ' entrou nesta sala');
            socket.emit('updateSalas', salas, 'sala1');
        });
        
        socket.on('enviaMensagem', function (data) {
            io.sockets.in(socket.sala).emit('atualizarMensagens', socket.usuario, data);
        });

        socket.on('mudarSala', function(newsala){
            socket.leave(socket.sala);
            socket.join(newsala);
            socket.emit('atualizarMensagens', 'Servidor', 'voce entrou em: '+ newsala);
            socket.broadcast.to(socket.sala).emit('atualizarMensagens', 'Servidor', socket.usuario+' saiu desta sala');
            socket.sala = newsala;
            socket.broadcast.to(newsala).emit('atualizarMensagens', 'Servidor', socket.usuario+' entrou nesta sala');
            socket.emit('updateSalas', salas, newsala);
        });
        
        socket.on('disconnect', function(){
            delete usuarios[socket.usuario];
            io.sockets.emit('atualizaListaUsuarios', usuarios);
            socket.broadcast.emit('atualizarMensagens', 'Servidor', socket.usuario + ' desconectou.');
            socket.leave(socket.sala);
        });
    });

       

#### <i class="icon-hdd"></i>  index.html

        <!-- index.html -->
        <html>
        <head>
            <title>Chat Real-time</title>
        </head>
        <body>
            <div style="float:left;width:100px;border-right:1px solid black;height:300px;padding:10px;overflow:scroll-y;">
                <b>SALAS</b>
                <div id="salas"></div>
                <b>USUARIOS</b>
                <div id="usuarios"></div>
            </div>
            <div style="float:left;width:300px;height:250px;overflow:scroll-y;padding:10px;">
                <div id="conversation"></div>
                <input id="data" style="width:200px;" />
                <input type="button" id="datasend" value="Enviar" />
            </div>
            <script src="/socket.io/socket.io.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
            <script>
                var socket = io.connect('http://localhost:8080');
                socket.on('connect', function(){
                    socket.emit('entrar', prompt("Qual seu nome?"));
                });
                socket.on('atualizarMensagens', function (username, data) {
                    $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
                });
                socket.on('atualizaListaUsuarios', function(data) {
                    $('#usuarios').empty();
                    $.each(data, function(key, value) {
                        $('#usuarios').append('<div>' + key + '</div>');
                    });
                });
                socket.on('updateSalas', function(salas, sala_atual) {
                    $('#salas').empty();
                    $.each(salas, function(chave, valor) {
                        if(valor == sala_atual){
                            $('#salas').append('<div>' + valor + '</div>');
                        }
                        else {
                            $('#salas').append('<div><a href="#" onclick="mudarSala(\''+valor+'\')">' + valor + '</a></div>');
                        }
                    });
                });

                function mudarSala(sala){
                    socket.emit('mudarSala', sala);
                }
                
                $(function(){
                    $('#datasend').click( function() {
                        var menssagem = $('#data').val();
                        $('#data').val('');
                        socket.emit('enviaMensagem', menssagem);
                    });

                    $('#data').keypress(function(e) {
                        if(e.which == 13) {
                            $(this).blur();
                            $('#datasend').focus().click();
                        }
                    });
                });

            </script>
        </body>
        </html>

#### <i class="icon-hdd"></i>  package.json

    {
    "name": "lab18",
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
