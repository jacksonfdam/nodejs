### <i class="icon-file"></i>Lab 11

#### <i class="icon-hdd"></i>  index.js

		var http = require('http') //  modulo http 
			, fs = require('fs');  //  modulo file system 

		// store the contents of 'index.html' to a buffer
		var html = fs.readFileSync('./index.html');

		// create the http server
		http.createServer(function (req, res) {

			// handle the routes
			if (req.method == 'POST') {

				// pipe the request data to the console
				req.pipe(process.stdout);

				// pipe the request data to the response to view on the web
				res.writeHead(200, {'Content-Type': 'text/plain'});
				req.pipe(res);

			} else {
				
				// for GET requests, serve up the contents in 'index.html'
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(html);
			}

		}).listen(8000);

#### <i class="icon-hdd"></i>  index.html 

		<html>
		<head>
			<title>Lab12</title>
			<style type="text/css">
				body {
					font-family:Arial, Helvetica, sans-serif;	
				}
			
				h1 {
					font-size:18px;
					font-weight:normal;
					text-transform: capitalize;
				}

				#textbox {
					width:300px;
					height:250px;
				}

			</style>
		</head>
		<body>
			<h1>Lab12</h1>

			<form method="post" action="/">
				<textarea name="text" id="textbox">Lab12</textarea>
				<br />
				<input type="submit" id="submit" name="submit" value="Enviar" />
			</form>
		</body>
		</html>