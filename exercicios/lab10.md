### <i class="icon-file"></i>Lab 09

#### <i class="icon-hdd"></i>  requestHandlers.js

		function home() {
			console.log("Metodo 'home' foi chamado.");
		}

		function contato() {
			console.log("Metodo 'contato' foi chamado.");
		}

		exports.home = home;
		exports.contato = contato;


#### <i class="icon-hdd"></i>  router.js 

		function route(handle, pathname,response) {
			console.log("Roteado o modulo " + pathname);
			if (typeof handle[pathname] === 'function') {
				handle[pathname](response);
			} else {
				response.writeHead(404, {"Content-Type": "text/plain"});
				response.write("404 Not found");
				response.end();

				console.log("Não foi encontrado o modulo " + pathname);
			}
		}

		exports.route = route;


#### <i class="icon-hdd"></i>  server.js 

		var http = require("http");
		var url = require("url");

		function start(route, handle) {
			function onRequest(request, response) {
				var pathname = url.parse(request.url).pathname;
				console.log("Request de  " + pathname + " recebido.");

				route(handle, pathname,response);

				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write("Pagina Inicial");
				response.end();
			}

			http.createServer(onRequest).listen(8000);
			console.log("Servidor iniciado.");
		}

		exports.start = start;


#### <i class="icon-hdd"></i>  index.js 

		var server = require("./server");
		var router = require("./router");
		var requestHandlers = require("./requestHandlers");

		var handle = {}
		handle["/"] = requestHandlers.home;
		handle["/home"] = requestHandlers.home;
		handle["/contato"] = requestHandlers.contato;

		server.start(router.route, handle);
