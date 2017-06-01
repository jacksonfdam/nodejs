### <i class="icon-file"></i>Lab 06

    var fs = require('fs'),
        http = require('http');

    http.createServer(function (req, res) {
      fs.readFile(__dirname + req.url, function (err,data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
    }).listen(8080);

#### <i class="icon-hdd"></i>  Passando Encoding

    var fs = require('fs');

    fs.readFile('example.file', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
    });


    var data = fs.readFileSync('example.file','utf8');
    console.log(data);



#### <i class="icon-hdd"></i>  app.js

    var http = require('http');
    var fs = require('fs');

    var server = http.createServer(function(request, response) {
        fs.readFile(__dirname + '/lab06.html', function(err, html) {
            response.writeHeader(200, {
                'Content-Type': 'text/html'
            });
            response.write(html);
            response.end();
        });
    });

    server.listen(3000, function() {
        console.log('Executando Servidor HTTP');
    });

#### <i class="icon-hdd"></i>  lab06.html

    <!-- index.html -->
    <!DOCTYPE html>
    <html>
      <head>
        <title>Lab06</title>
      </head>
      <body>
        <h1>Lab06</h1>
      </body>
    </html>
