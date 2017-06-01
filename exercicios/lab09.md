### <i class="icon-file"></i>Lab 09

#### <i class="icon-hdd"></i>  router.js

		function route(pathname) {
			console.log("About to route a request for " + pathname);
		}

		exports.route = route;

#### <i class="icon-hdd"></i>  server.js 

		var http = require("http");
		var url = require("url");

		function start(route) {
			function onRequest(request, response) {
				var pathname = url.parse(request.url).pathname;
				console.log("Request de " + pathname + " recebido.");

				route(pathname);

				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write("Hello World");
				response.end();
			}

			http.createServer(onRequest).listen(8888);
			console.log("O Servidor foi iniciado.");
		}

		exports.start = start;

#### <i class="icon-hdd"></i>  index.js

		var server = require("./server");
		var router = require("./router");

		server.start(router.route);

