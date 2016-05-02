// app.js
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {
    fs.readFile(__dirname + '/estados-cidades.json', function(err, arquivo) {
        response.writeHeader(200, {
            'Content-Type': 'application/json'
        });
        response.write(arquivo);
        response.end();
    });
});

server.listen(3000, function() {
    console.log('Executando Servidor HTTP');
});
