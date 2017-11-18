### <i class="icon-file"></i>Lab 11

#### <i class="icon-hdd"></i>  requestHandlers.js 


		var querystring = require("querystring");
		var url = require("url");

		function home(response, postData, request) {
			console.log("Request handler 'home' was called.");

			var body = '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; '+
			'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<form action="/contato" method="post">'+
			'<textarea name="text" rows="20" cols="60"></textarea>'+
			'<input type="submit" value="Submit text" />'+
			'</form>'+
			'</body>'+
			'</html>';

			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(body);
			response.end();
		}

		function contato(response, postData, request) {
			console.log("Request handler 'contato' was called.");
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("You've sent: " + postData);
			response.write("You've sent the text: " + querystring.parse(postData).text);
			response.write("You've sent the ParamsWithValue: " + querystring.parse(url.parse(request.url).query).text);
			response.end();
		}

		exports.home = home;
		exports.contato = contato;


#### <i class="icon-hdd"></i>  router.js 


		function route(handle, pathname, response, postData, request) {
			console.log("About to route a request for " + pathname);
			if (typeof handle[pathname] === 'function') {
				handle[pathname](response, postData, request);
			} else {
				console.log("No request handler found for " + pathname);
				response.writeHead(404, {"Content-Type": "text/plain"});
				response.write("404 Not found");
				response.end();
			}
		}
		exports.route = route;



#### <i class="icon-hdd"></i>  server.js 


		var http = require("http");
		var url = require("url");

		function start(route, handle) {
			function onRequest(request, response) {
				var postData = "";
				var pathname = url.parse(request.url).pathname;
				console.log("Request for " + pathname + " received.");

				request.setEncoding("utf8");

				request.addListener("data", function(postDataChunk) {
					postData += postDataChunk;
					console.log("Received POST data chunk '"+
						postDataChunk + "'.");
				});

				request.addListener("end", function() {
					route(handle, pathname, response, postData, request);
				});

			}

			http.createServer(onRequest).listen(8000);
			console.log("Server has started.");
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

### <i class="icon-file"></i>Lab 11 - 01

#### <i class="icon-hdd"></i>  index.js 

		var server = require("./server");
		var router = require("./router");
		var requestHandlers = require("./requestHandlers");

		var handle = {}
		handle["/"] = requestHandlers.home;
		handle["/home"] = requestHandlers.home;
		handle["/favicon.ico"] = requestHandlers.home;
		handle["/estados"] = requestHandlers.estados;
		handle["/cidades"] = requestHandlers.cidades;

		server.start(router.route, handle);

#### <i class="icon-hdd"></i>  server.js 

		var http = require("http");
		var url = require("url");

		function start(route, handle) {
			function onRequest(request, response) {
				var pathname = url.parse(request.url).pathname;
				console.log("Request de  " + pathname + " recebido.");
				route(handle, pathname,response,request);
			}

			http.createServer(onRequest).listen(8000);
			console.log("Servidor iniciado.");
		}

		exports.start = start;

#### <i class="icon-hdd"></i>  router.js 

		function route(handle, pathname, response, request) {
			console.log("Roteado o modulo " + pathname);
			if (typeof handle[pathname] === 'function') {
				handle[pathname](response,request);
			} else {
				response.writeHead(404, {"Content-Type": "text/plain"});
				response.write("404 Not found");
				response.end();

				console.log("Não foi encontrado o modulo " + pathname);
			}
		}

		exports.route = route;

#### <i class="icon-hdd"></i>  requestHandlers.js 

		var fs = require('fs');
		var url = require("url");

		function getHeaders(){
			var headers = {};
				headers["Access-Control-Allow-Origin"] = "*";
				headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
				headers["Access-Control-Allow-Credentials"] = true;
				headers["Access-Control-Max-Age"] = '86400'; // 24 hours
				headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
				headers['Content-Type'] = 'Content-type: application/json; charset=utf-8';
			return headers;	    
		}


		function home(response,request) {
			console.log("Metodo 'home' foi chamado.");
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("Pagina Inicial");
			response.end();
		}

		function estados(response,request) {
			console.log("Metodo 'estados' foi chamado.");
			fs.readFile(__dirname + '/estados-cidades.json', function(err, arquivo) {
				response.writeHead(200, getHeaders());
				var jsonData = JSON.parse(arquivo);

				var returnData = [];

				for(var i = 0; i < jsonData.estados.length; i++){
					var estado = jsonData.estados[i];
					returnData.push({
						"nome":estado.nome,
						"sigla":estado.sigla
					});
				}

				response.write(JSON.stringify(returnData));
				response.end();
			});
		}

		function cidades(response,request) {
			console.log("Metodo 'cidades' foi chamado.");
			fs.readFile(__dirname + '/estados-cidades.json', function(err, arquivo) {
				response.writeHead(200, getHeaders());
				var returnData = [];

				var result = url.parse(request.url, true);
				if(typeof result.query['uf'] !== 'undefined'){
					var sigla = result.query['uf'].toLowerCase();
					console.log('Estado Selecionado',result.query['uf']);

					var jsonData = JSON.parse(arquivo);

					for(var i = 0; i < jsonData.estados.length; i++){
						var estado = jsonData.estados[i];
						if(estado.sigla.toLowerCase() == sigla){
							returnData = estado.cidades;
							break;
						}
					}
				}
				response.write(JSON.stringify(returnData));
				response.end();
			});
		}

		exports.home = home;
		exports.estados = estados;
		exports.cidades = cidades;


### <i class="icon-file"></i>Lab 11 - 02

#### <i class="icon-hdd"></i>  index.js 

		var server = require("./server");
		var router = require("./router");
		var requestHandlers = require("./requestHandlers");

		var handle = {}
		handle["/"] = requestHandlers.home;
		handle["/home"] = requestHandlers.home;
		handle["/favicon.ico"] = requestHandlers.home;
		handle["/hcontatoome"] = requestHandlers.contato;

		server.start(router.route, handle);

#### <i class="icon-hdd"></i>  server.js 

		var http = require("http");
		var url = require("url");

		function start(route, handle) {
			function onRequest(request, response) {
				var pathname = url.parse(request.url).pathname;
				console.log("Request de  " + pathname + " recebido.");
				route(handle, pathname,response,request);
			}

			http.createServer(onRequest).listen(8000);
			console.log("Servidor iniciado.");
		}

		exports.start = start;

#### <i class="icon-hdd"></i>  router.js 

		function route(handle, pathname, response, request) {
			console.log("Roteado o modulo " + pathname);
			if (typeof handle[pathname] === 'function') {
				handle[pathname](response,request);
			} else {
				response.writeHead(404, {"Content-Type": "text/plain"});
				response.write("404 Not found");
				response.end();

				console.log("Não foi encontrado o modulo " + pathname);
			}
		}

		exports.route = route;

#### <i class="icon-hdd"></i>  requestHandlers.js 

		var fs = require('fs');
		var url = require("url");
		var querystring = require("querystring");

		function getHeaders(){
			var headers = {};
				headers["Access-Control-Allow-Origin"] = "*";
				headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
				headers["Access-Control-Allow-Credentials"] = true;
				headers["Access-Control-Max-Age"] = '86400'; // 24 hours
				headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
				headers['Content-Type'] = 'Content-type: application/json; charset=utf-8';
			return headers;	    
		}


		function home(response, postData, request) {
			console.log("Request handler 'home' was called.");

			var body = '<html>'+
			'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; '+
			'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
			'<form action="/contato" method="post">'+
			'<br/>Conteudo: <br/><textarea name="dados" rows="20" cols="60"></textarea>'+
			'<br/>Autor: <br/><input type="text" name="autor"/>'+
			'<br/>Nome Arquivo: <br/><input type="text" name="nome_arquivo"/>'+
			'<input type="submit" value="Submit text" />'+
			'</form>'+
			'</body>'+
			'</html>';

			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(body);
			response.end();
		}

Deve-se criar uma pasta com a data corrente, e dentro da mesma
um arquivo de texto com o nome submetido via form (nome_arquivo), 
contendo na primeira linha o nome do autor(autor) e em seguida os dados
enviados pelo campo dados.


		function contato(response, postData, request) {
			console.log("Request handler 'contato' was called.");
			response.writeHead(200, {"Content-Type": "text/html"});
			//response.write("<pre>You've sent: " + postData + "</pre>");
			response.write("<br/><strong>Nome Autor: </strong>" + querystring.parse(postData).autor);
			response.write("<br/><strong>Nome Arquivo: </strong>" + querystring.parse(postData).nome_arquivo);
			response.write("<br/><strong>Conteudo Arquivo: </strong>" + querystring.parse(postData).dados);
			response.end();
		}

		exports.home = home;
		exports.contato = contato;




