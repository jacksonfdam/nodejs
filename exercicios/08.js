var http = require('http');
var postHTML = 
'<html><head><title>Acesso</title></head>' +
'<body>' +
'<form method="post">' +
'Usuario: <input type="text" name="usuario"/><br>' +
'Senha: <input type="password" name="senha"/><br>' +
'<input type="submit" value="enviar">' +
'</form>' +
'</body></html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
    res.writeHead(200);
    res.end(postHTML);
  });
}).listen(8080);