var http = require('http');
var requestListener = function (req, res) {
  req.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end('Teste de Webserver\n');
}

var server = http.createServer(requestListener);
server.listen(3000);