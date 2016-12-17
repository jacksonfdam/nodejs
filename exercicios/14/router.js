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
