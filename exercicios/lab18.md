### <i class="icon-file"></i>Lab 18

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

        socket.on('message', function(event) {
            console.log('Received message from client!', event);
        });

        socket.on('disconnect', function() {
            clearInterval(interval);
            console.log('Server has disconnected');
        });

        var interval = setInterval(function() {
            socket.send('This is a message from the server!  ' + new Date().getTime());
        }, 5000);

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
  

### <i class="icon-file"></i>Lab 18 01


A variável clientes que está sendo criada servirá para armazenar nossa lista de clientes.

Agora iremos adicionar o nosso primeiro evento do Socket.io, que será o connection, que dispara a cada vez que um cliente se conecta ao socket.

        io.on("connection", function (client) {
            console.log('user connected');
        });
        Para nossa sala de chat, precisaremos implementar outros 3 eventos: join, send e disconnect:

        io.on("connection", function (client) {
        client.on("join", function(name){
            console.log("Joined: " + name);
            clients[client.id] = name;
            client.emit("update", "You have connected to the server.");
            client.broadcast.emit("update", name + " has joined the server.")
        });

        client.on("send", function(msg){
            console.log("Message: " + msg);
            client.broadcast.emit("chat", clients[client.id], msg);
        });

        client.on("disconnect", function(){
            console.log("Disconnect");
            io.emit("update", clients[client.id] + " has left the server.");
            delete clients[client.id];
        });
        });

O evento join deverá ser disparado quando o cliente entrar no servidor, adicionando o id do cliente no array e emitindo dois novos eventos, nomeando-os de update.

Note que há uma diferença entre o método client.emit e o client.broadcast.emit. 

O client.emit enviará a notificação somente para o cliente atual, ou seja, o cliente que acabou de entrar na sala de chat. 

O client.broadcast.emit irá emitir para todos os clientes conectados, com exceção do que está executando a ação. Se utilizássemos o método io.emit, a mensagem seria enviada a todos os clientes conectados ao socket. Abaixo uma série de exemplos de métodos disponíveis:

        // enviar apenas para o cliente atual
        client.emit('message', "this is a test");

        // enviar para todos os clientes, inclusive o atual
        io.emit('message', "this is a test");

        // enviar para todos os clientes, exceto o atual
        client.broadcast.emit('message', "this is a test");

        // enviar para todos os clientes (com exceção do atual) para uma sala específica
        socket.broadcast.to('game').emit('message', 'nice game');

        // enviar para todos os clientes em uma sala específica
        io.in('game').emit('message', 'cool game');

        // enviar para o atual, caso ele esteja na sala
        client.to('game').emit('message', 'enjoy the game');

        // enviar para todos os clientes em um namespace 'namespace1'
        io.of('namespace1').emit('message', 'gg');

        // enviando para um socketid individual
        client.broadcast.to(socketid).emit('message', 'for your eyes only');

Com todos esses métodos, conseguiríamos implementar salas específicas, mensagens individuais, etc. Porém nosso foco é mostrar a parte mais básica e entender o funcionamento.


When your server listens, you usually get a socket at the "connection" event :

require('socket.io').on('connect', function(socket){
A socket connects 2 points : the client and the server. When you emit on this socket, you emit to this specific client.

Example :

    var io = require('socket.io');
    io.on('connect', function(socket){
        socket.on('A', function(something){
            // we just received a message
            // let's respond to *that* client :
            socket.emit('B', somethingElse);
        });
    });

Be careful that those are two different calls :

    socket.emit : emit to just one socket
    io.sockets.emit : emit to all sockets


The syntax is confusing in socketio. Also, every socket is automatically connected to their own room with the id socket.id (this is how private chat works in socketio, they use rooms).

Send to the sender and noone else

    socket.emit('hello', msg);

Send to everyone including the sender(if the sender is in the room) in the room "my room"

    io.to('my room').emit('hello', msg);

Send to everyone except the sender(if the sender is in the room) in the room "my room"

    socket.broadcast.to('my room').emit('hello', msg);

Send to everyone in every room, including the sender

    io.emit('hello', msg); // short version

    io.sockets.emit('hello', msg);

Send to specific socket only (private chat)

    socket.broadcast.to(otherSocket.id).emit('hello', msg);    

#### <i class="icon-hdd"></i>  index.js

    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    var clients = {}; 

    app.get('/', function(req, res){
    res.send('server is running');
    });

    io.on("connection", function (client) {  
        client.on("join", function(name){
            console.log("Joined: " + name);
            clients[client.id] = name;
            client.emit("update", "You have connected to the server.");
            client.broadcast.emit("update", name + " has joined the server.")
        });

        client.on("send", function(msg){
            console.log("Message: " + msg);
            client.broadcast.emit("chat", clients[client.id], msg);
        });

        client.on("disconnect", function(){
            console.log("Disconnect");
            io.emit("update", clients[client.id] + " has left the server.");
            delete clients[client.id];
        });
    });


    http.listen(3000, function(){
        console.log('listening on port 3000');
    });


#### <i class="icon-hdd"></i>  index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Lab 18</title>
        <style>
            @import url(http://fonts.googleapis.com/css?family=Lato:100,300,400,700);
            @import url(http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);

            html, body {
                background: #e5e5e5;
                font-family: 'Lato', sans-serif;
                margin: 0px auto;
                height:100%;
            }
            ::selection{
                background: #F36C44;
                color: #FFF;
            }
            input { outline: none; }

            a{
                color: rgba(82,179,217,0.9);
            }


            .nickname_container {
                background: #F36C44;
                width: 100%;
                height:100%;
                margin: 0;
                padding: 0;
                top: 0;
                left: 0;
                z-index:2000;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;

            }

            .nickname_container span {
                color:#FFF;
            }

            .nickname_container input {
                text-align:center;
                color:#FFF;
                font-size: 35px;
                height:50px;
                background: #F36C44;
                border:none;
                border-bottom:1px solid #CB5B3B;
                margin:15px 10%;
            }

            /* Menu */

            .menu {
                position: fixed;
                top: 0px;
                left: 0px;
                right: 0px;
                width: 100%;
                height: 50px;
                background: #F36C44;
                z-index: 100;
            }

            .name, .last {
                position: absolute;
                left: 15px;
                font-family: 'Lato';
                cursor: default;
            }
            .name {
                font-size: 25px;
                font-weight: 300;
                color: rgba(255,255,255,0.98);
                top: 3px;
            }
            .last{
                font-size: 11px;
                font-weight: 400;
                color: rgba(255,255,255,0.6); 
                top: 30px;
            }


            /* Msgs */

            .chat {
                list-style: none;
                background: none;
                margin: 0;
                padding: 0 0 50px 0;
                margin-top: 60px;
                margin-bottom: 10px;
            }
            .chat li {
                padding: 0.5rem;
                overflow: hidden;
                display: flex;
            }

            .other .msg {
                order: 1;
                border-top-left-radius: 0px;
                box-shadow: -1px 2px 0px #D4D4D4;
            }
            .other:before {
                content: "";
                position: relative;
                top: 0px;
                right: 0px;
                left: 40px;
                width: 0px;
                height: 0px;
                border: 5px solid #fff;
                border-left-color: transparent;
                border-bottom-color: transparent;
            }

            .self {
                justify-content: flex-end;
                align-items: flex-end;
            }
            .self .msg {
                order: 1;
                border-bottom-right-radius: 0px;
                box-shadow: 1px 2px 0px #D4D4D4;
            }

            .msg span {
                font-size: 0.7rem;
                color: #969898;
            }

            .msg {
                background: white;
                min-width: 50px;
                padding: 10px;
                border-radius: 2px;
                box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
            }
            .msg p {
                font-size: 0.8rem;
                margin: 0 0 0.2rem 0;
                color: #777;
            }

            .info {
                color:#FFF;
                background:#A2A4A4;
            }

            .msg time {
                font-size: 0.7rem;
                color: #ccc;
                margin-top: 3px;
                float: right;
                cursor: default;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            }
            .msg time:before{
                content:"\f017";
                color: #ddd;
                font-family: FontAwesome;
                display: inline-block;
                margin-right: 4px;
            }

            /* typping */

            input.textarea {
                position: fixed;
                bottom: 0px;
                left: 0px;
                right: 0px;
                width: 100%;
                height: 50px;
                z-index: 99;
                background: #fafafa;
                border: none;
                outline: none;
                padding:10px;
                color: #666;
                font-weight: 400;
            }
        </style>
    </head>
    <body>

        <div class="nickname_container" id="nick">

            <span>Type your nickname:</span>
            <form id="submit"><input type="text" id="nickname" /></form>

        </div>

        <div id="chat" hidden>

            <div class="menu">
                <div class="name" id="name">Jackson</div>
                <div class="last" id="time">06:00</div>
            </div>

            <ol class="chat">

            </ol>

            <input class="textarea" type="text" placeholder="Type here!" id="textarea" />
        </div>
        <script src="node_modules/jquery/dist/jquery.min.js"></script>
        <script src="node_modules/socket.io-client/dist/socket.io.js"></script>
        <script>
            $(document).ready(function(){  
                var socket = io.connect("http://localhost:3000");
                var ready = false;

                $("#submit").submit(function(e) {
                    e.preventDefault();
                    $("#nick").fadeOut();
                    $("#chat").fadeIn();
                    var name = $("#nickname").val();
                    var time = new Date();
                    $("#name").html(name);
                    $("#time").html('First login: ' + time.getHours() + ':' + time.getMinutes());

                    ready = true;
                    socket.emit("join", name);

                });

                $("#textarea").keypress(function(e){
                    if(e.which == 13) {
                        var text = $("#textarea").val();
                        $("#textarea").val('');
                        var time = new Date();
                        $(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
                        socket.emit("send", text);

                    }
                });


                socket.on("update", function(msg) {
                    if (ready) {
                        $('.chat').append('<li class="info">' + msg + '</li>')
                    }
                }); 

                socket.on("chat", function(client,msg) {
                    if (ready) {
                        var time = new Date();
                        $(".chat").append('<li class="other"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
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
            "express": "^4.14.0",
            "i": "^0.3.5",
            "jquery": "^3.1.1",
            "npm": "^3.10.9",
            "socket.io-client": "^1.5.1",
            "socketio": "^1.0.0"
        }
    }

### <i class="icon-file"></i>Lab 18 02


#### <i class="icon-hdd"></i>  index.js

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


#### <i class="icon-hdd"></i>  data.json

    [{
        "nome": "jackson",
        "email": "jackson@gmail.com"
    }, {
        "nome": "ricardo",
        "email": "ricardo@gmail.com"
    }]

#### <i class="icon-hdd"></i>  index.html
        
    <html>
        <head>
            <title>Lab 18</title>
        </head>
        <body>
            <time></time>
            <div id="container">Lab 18</div>
            <script src="socket.io/socket.io.js"></script>
            <script>
            // creating a new websocket
            var socket = io.connect('http://localhost:8000');
            // on every message recived we print the new datas inside the #container div
            socket.on('notification', function (data) {
            var dados = "";
            var _data = "";
            console.log(data);
                // convert the json string into a valid javascript object
                var _data = JSON.parse(data);
                console.log(_data);
                var dados = "";
                for(x=0;x < _data.length; x++){
                    dados += "\n<br/>" + _data[x].nome;
                }
                //console.log(dados);
            
                // Let's check if the browser supports notifications
                if (!("Notification" in window)) {
                    alert("This browser does not support desktop notification");
                }
                

        // Let's check if the user is okay to get some notification
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification(dados);
        }

        // Otherwise, we need to ask the user for permission
        // Note, Chrome does not implement the permission static property
        // So we have to check for NOT 'denied' instead of 'default'
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
            // Whatever the user answers, we make sure we store the information
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(dados);
            }
        });
        }

        // At last, if the user already denied any notification, and you 
        // want to be respectful there is no need to bother them any more.

        
        document.querySelector('#container').innerHTML = dados;
        document.querySelector('time').innerHTML = 'Last Update:' + _data.time;
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
  
### <i class="icon-file"></i>Lab 18 03

#### <i class="icon-hdd"></i>  index.js

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
