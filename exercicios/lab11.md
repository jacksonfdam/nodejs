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

