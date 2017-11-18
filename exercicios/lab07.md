### <i class="icon-file"></i>Lab 07


#### <i class="icon-hdd"></i>  server.js 


        var http = require("http");

        function start() {
            function onRequest(request, response) {
                response.writeHead(200, {
                    "Content-Type": "text/html"
                });

                if (request.url == "/") {
                    response.write("<html><body><h1>Olá Node.js!</h1>");
                    response.write("<a href='/bemvindo'>Bem vindo</a>");
                    response.write("</body></html>");
                } else if (request.url == "/bemvindo") {
                    response.write("<html><body><h1>Bem-vindo ao Node.js!</h1>");
                    response.write("<a href='/'>Olá Node.js</a>");
                    response.write("</body></html>");
                } else {
                    response.write("<html><body><h1>Página não encontrada!</h1>");
                    response.write("<a href='/'>Voltar para o início</a>");
                    response.write("</body></html>");
                }
                response.end();
            }

            http.createServer(onRequest).listen(8888);
            console.log("Server has started.");
        }

        exports.start = start;

#### <i class="icon-hdd"></i>  app.js

        var server = require("./server");
        server.start();