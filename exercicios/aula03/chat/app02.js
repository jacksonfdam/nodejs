const KEY = 'nome-do-cookie';
const SECRET = 'chave-secreta-aqui!';

var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    app = express(),
    cons = require('consolidate'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    cookie = cookieParser(SECRET),
    store = new expressSession.MemoryStore();

// Configurando middlewares de Session e Cookie no Express
app.engine('html', cons.swig);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(cookie);
app.use(expressSession({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
}));

// Compartilhando a sessão válida do Express no Socket.IO
io.use(function(socket, next) {
    var data = socket.request;
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                return next(new Error('Acesso negado!'));
            } else {
                socket.handshake.session = session;
                return next();
            }
        });
    });
});

// Rota para acessar a página principal
app.get("/", function(req, res) {
    // Armazenando o nome na sessão.
    req.session.nome = "Usuario";
    res.render('index2');
});

// Iniciando uma conexão com Socket.IO.
io.sockets.on('connection', function(client) {
    // Recuperando uma sessão Express.
    var session = client.handshake.session;

    client.on('toServer', function(user, msg) {
        session.nome = user;
        msg = "<b>" + session.nome + ":</b> " + msg + "<br>";
        client.emit('toClient', msg);
        client.broadcast.emit('toClient', msg);
    });
});

server.listen(8000, function() {
    console.log("Rodando o server!");
});