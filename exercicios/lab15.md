### <i class="icon-file"></i>Lab 15

#### <i class="icon-hdd"></i>  populate.js

        var MongoClient = require('mongodb').MongoClient;
        var fs = require('fs');

        MongoClient.connect('mongodb://127.0.0.1:27017/brasil', function(err, db) {
            if (err) throw err;

            /* db.dropDatabase(); */

            db.dropCollection("estados", function() {
               console.log('Tabela Limpa');
            });

            fs.readFile('estados-cidades.json', 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var result = JSON.parse(data);
                db.collection('estados').insert(result.estados, function(err, records) {
                    if (err) throw err;
                    console.log("Estados Inseridos ", records);
                    process.exit(0);
                });
            });
        });


#### <i class="icon-hdd"></i>  server.js 


        var http = require("http");
        var Db = require('mongodb').Db,
            MongoClient = require('mongodb').MongoClient,
            Server = require('mongodb').Server,
            ReplSetServers = require('mongodb').ReplSetServers,
            ObjectID = require('mongodb').ObjectID,
            Binary = require('mongodb').Binary,
            GridStore = require('mongodb').GridStore,
            Grid = require('mongodb').Grid,
            Code = require('mongodb').Code,
            BSON = require('mongodb').pure().BSON;

        function start() {
            function onRequest(request, response) {
                response.writeHead(200, {
                    "Content-Type": "text/html"
                });

                response.write("<html><body><h1>Olá Node.js!</h1>");
                response.write("<a href='/bemvindo'>Bem vindo</a>");
                response.write("</body></html>");

                var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

                mongoclient.open(function(err, mongoclient) {

                    var db = mongoclient.db("brasil");

                     var estado = {
                        "sigla": "AL",
                        "nome": "Alagoas",
                        "cidades": []
                    };

                    //insert record
                    db.collection('estados').insert(estado, function(err, records) {
                        if (err) throw err;
                        console.log("Estado inserido como " + records[0]._id);
                    });

                    db.collection('estados').remove();

                    db.collection('estados').update({sigla: "AL"}, {sigla: "AL", capital:"Porto Alegre"}, {w:1}, function(err) {
                        if(err)
                            throw err;
                        console.log('Estado Atualizado');
                    });

                    db.collection('estados').update({sigla: "AL"}, {$set: {capital: "Canoas"}}, {w:1}, function(err) {
                        if(err)
                            throw err;
                        console.log('Estado Atualizado');
                    }); 

                    var cursor = db.collection('estados').find({"sigla" : "RS"});
                    cursor.each(function(err, doc) {
                        if(err)
                            throw err;
                        if(doc==null)
                            return;
                    
                        console.log("Estado encontrado:");
                        console.log(estado.sigla);
                    });

                    db.collection('estados').findAndModify({sigla: "RS"}, [], {remove:true}, function(err, object) {
                        if(err)
                            throw err;
                        console.log("Estado Excluido");
                    });

                    db.collection('estados').count(function (err, count) {
                        if (err) throw err;
                        
                        console.log('Total de estados: ' + count);
                    });

                    db.collection('estados', function (err, collection) {
                        collection.find().toArray(function(err, estados) {
                            if(err) throw err;    
                            console.log(estados);            
                        });
                        
                    });
                   
                });
                

                response.end();
            }

            http.createServer(onRequest).listen(8888);
            console.log("Server has started.");
        }

        exports.start = start;

#### <i class="icon-hdd"></i>  index.js

        var server = require("./server");
        server.start();


#### <i class="icon-hdd"></i>  package.json

    {
    "name": "lab15",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "postinstall": "node populate.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
            "mongodb": "*"
        }
    }

      