var exec = require("child_process").exec;

function home(response) {
	console.log("Metodo 'home' foi chamado.");
	var body =  '<html>'+
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

	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write(body);
	response.end();
}

function contato(response) {
	console.log("Metodo 'contato' foi chamado.");
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write("Entre em contato");
	response.end();
}

exports.home = home;
exports.contato = contato;