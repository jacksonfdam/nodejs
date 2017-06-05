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


#### <i class="icon-upload"></i> Ler Arquivo

        var fs = require('fs');
        fs.readFile('/index.html', function(erro, arquivo){
            if (erro) throw erro;
            console.log(arquivo);
        });

        var arquivo = fs.readFileSync('/index.html');
        console.log(arquivo);

        fs.readFile("data.txt", "utf8", function(error, data) {
            console.log(data);
        });


        var data = fs.readFileSync("foo.txt", "utf8");

        console.log(data);

#### <i class="icon-upload"></i> Watch

        fs.watch(__dirname + '/index.html', function(curr, prev) {
            fs.readFile(__dirname + '/index.html', "utf-8", function(err, data) {
                if (err) throw err;
                console.log(data);
            });
        });


        fs.watch(__dirname + '/index.html', {persistent: true}, function(event, filename) {
        console.log(event + " event occurred on " + filename);
        });


#### <i class="icon-upload"></i> Criar Arquivo

        var fs = require('fs');
        fs.writeFile('data2.txt', 'Hello, World!', function (err) {
            if (err)
            throw err;
        });

#### <i class="icon-upload"></i> Excluir Arquivo

        fs.unlink('data.txt', function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Apagado com sucesso");
        });

#### <i class="icon-upload"></i> Listar conteúdo da pasta

        var fs = require('fs');
        fs.readdir('.', function (err, files) {
            if (err)
                throw err;
            for (var index in files) {
                console.log(files[index]);
            }
        });

        fs.readdir("/pasta2/",function(err, files){
            if (err) {
                return console.error(err);
            }
            files.forEach( function (file){
                console.log( file );
            });
        });

#### <i class="icon-upload"></i> Criar Pasta

        fs.mkdir('/pasta2',function(err){
            if (err) {
                return console.error(err);
            }
            console.log("Sucesso!");
        });

       
        });

#### <i class="icon-upload"></i> Rename

       fs.rename('data2.txt', 'data2_new.txt', function (err) {
            if (err)
                throw err;
            console.log('Renomeado');
        });
     

#### <i class="icon-upload"></i> Permissoes

        fs.chmod('data3.txt', '0777', function (err) {
            if (err)
                throw err;
            console.log('Mudou as permissoes');
        });
     

#### <i class="icon-upload"></i> Stat

       fs.stat('data.txt', function (err, stats) {
            if (err)
                throw err;
            if (stats.isFile()) {
                console.log('É um arquivo!');
            }
            if (stats.isDirectory()) {
                console.log('É um diretório!');
            }
            for (var i in stats) {
                if ('function' !== typeof stats[i])
                    console.log(i + '\t= ' + stats[i]);
            }
        });

       

#### <i class="icon-upload"></i> traverseFileSystem.js

        var fs = require('fs');
        var traverseFileSystem = function (currentPath) {
            console.log(currentPath);
            var files = fs.readdirSync(currentPath);
            for (var i in files) {
                var currentFile = currentPath + '/' + files[i];
                var stats = fs.statSync(currentFile);
                if (stats.isFile()) {
                    console.log(currentFile);
                }
                else if (stats.isDirectory()) {
                    traverseFileSystem(currentFile);
                }
            }
        };
        traverseFileSystem('..');

       