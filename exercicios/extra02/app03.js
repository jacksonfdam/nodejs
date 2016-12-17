var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response) {

    // Faz um parse da string url digitada.
    var result = url.parse(request.url, true);

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write("<html><body>");
    response.write("<h1>Dados da query string</h1>");
    // Itera o resultado de parâmetros passados via query string.
    for (var key in result.query) {
        response.write("<h2>" + key + " : " + result.query[key] + "</h2>");
    }
    response.write("</body></html>");
    response.end();
});

server.listen(3000, function() {
    console.log('Executando Servidor HTTP');
});
//Acesse http://localhost:3000/?nome=joao&idade=22&email=joao@mail.net