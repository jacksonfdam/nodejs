### <i class="icon-file"></i>Lab 16


#### <i class="icon-hdd"></i>  index.js

       
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'mysql'
        });

        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + connection.threadId);
        });

        connection.query('SELECT id, sigla, nome, capital FROM estados WHERE capital = "Porto Alegre"', function(err, rows, fields) {
            if (err) throw err;

            console.log('O Estado : ', rows[0].nome);
        });

        connection.query()
            .select(["id", "sigla", "nome"])
            .from("estados")
            .where("sigla IN ?", [
                ["RS", "SC", "PR"]
            ])
            .and("created > ?", [new Date(2016, 1, 1)])
            .execute(function(error, rows, columns) {
                if (error) {
                    console.log('ERROR: ' + error);
                    return;
                }
               var total = rows.length;
               for(var i = 0; i < total; i++){
                    console.log("Estado ", rows[i]);
               }
            });

        connection.end();


#### <i class="icon-hdd"></i>  package.json

    {
    "name": "lab16",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
            "mysql": "*"
        }
    }

       











