/*

Reescrevendo o código anterior:


var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Aula Nodejs");
  response.end();
}).listen(8888);

*/

var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Aula Nodejs");
  response.end();
}

http.createServer(onRequest).listen(8888);


