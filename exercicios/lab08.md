### <i class="icon-file"></i>Lab 08

									url.parse(string).query
												|
				url.parse(string).pathname 		|
									| 			|
									| 			|
								------ -------------------
		http://localhost:8888/start?foo=bar&hello=world
										--- 		-----
											|		 |
											| 		 |
					querystring(string)["foo"] 	 |
													|
							querystring(string)["hello"]


#### <i class="icon-hdd"></i> lab08.js 

		var http = require("http");
		var url = require("url");

		function start() {
			function onRequest(request, response) {
				var pathname = url.parse(request.url).pathname;
				console.log("Request for " + pathname + " received.");
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write("Hello World");
				response.end();
			}

			http.createServer(onRequest).listen(8888);
			console.log("Server has started.");
		}

		exports.start = start;

#### <i class="icon-hdd"></i> index.js

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

Acesse http://localhost:3000/?nome=joao&idade=22&email=joao@mail.net