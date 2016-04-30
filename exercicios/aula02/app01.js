var http = require('http');

var server = http.createServer(function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write("<html><body><h1>Olá Node.js!</h1></body></html>");
    response.end();
});

server.listen(3000, function() {
    console.log('Executando Servidor HTTP');
});