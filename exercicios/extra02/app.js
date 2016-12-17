// Carrega a biblioteca HTTP do Node.js.
var http = require('http');
// Cria um serviço web para tratar a requisição de resposta da mensagem Hello World.
var server = http.createServer(function(request, response) {
    // Define os parâmetros de cabeçalho de resposta.
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    // Escreve uma mensagem de resposta do servidor.
    response.write('<html><body><h1>Hello World</h1></body></html>');
    // Envia uma resposta para o cliente
    response.end();
});
// Define a porta e IP que será executado a aplicação.
server.listen(3000);
// Imprime mensagem no terminal do servidor.
console.log('Servidor Node.js em execucao');

//Acesse http://localhost:3000