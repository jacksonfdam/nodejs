// app.js
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {
    fs.readFile(__dirname + '/estados-cidades.json', function(err, arquivo) {
        var headers = {};
	    headers["Access-Control-Allow-Origin"] = "*";
	    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	    headers["Access-Control-Allow-Credentials"] = true;
	    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	    headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
	    headers['Content-Type'] = 'application/json';
	    response.writeHead(200, headers);    
	    response.write(arquivo);
        response.end();
    });
});

server.listen(8000, function() {
    console.log('Executando Servidor HTTP');
});
