### <i class="icon-file"></i>Lab 03

#### <i class="icon-folder-open"></i>Exemplo do Webserver

    var http = require("http");

    http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Aula Nodejs");
      response.end();
    }).listen(8888);

#### <i class="icon-pencil"></i> Reescrevendo o código anterior:

    var http = require("http");

    function onRequest(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Aula Nodejs");
      response.end();
    }

    http.createServer(onRequest).listen(8888);


