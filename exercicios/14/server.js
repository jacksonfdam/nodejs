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
