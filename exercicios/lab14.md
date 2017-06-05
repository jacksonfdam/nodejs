### <i class="icon-file"></i>Lab 14

#### <i class="icon-hdd"></i>  app.js

    var http = require('http');
    var fs = require('fs');

    var server = http.createServer(function(request, response) {
        fs.readFile(__dirname + '/app.html', function(err, html) {
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

#### <i class="icon-hdd"></i>  app.html

        <!DOCTYPE html>
        <meta name="robots" content="noindex">
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>EXEMPLO CORS</title>
        </head>
        <body ng-app="estadosAPP">
        <ul>
            <li></li>
        </ul>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.min.js"></script>

        <script id="jsbin-javascript">
            var estadosAPP = angular.module('estadosAPP',[]);
            /*
            CONTROLLER
            $http
            localhost:4000
            ng-repeat -> estados

            */
        </script>
        </body>
        </html>

       

#### <i class="icon-hdd"></i>  index.js

        var express   	=   require("express");
        var bodyParser  =   require("body-parser");
        var app       	=   express();
        var port 		    = 	4000;
        var fs 			    = 	require('fs');
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });

        app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
        });

        app.get('/',function(req,res){
            res.set({ 'content-type': 'application/json; charset=utf-8' })
            res.sendFile(__dirname + '/bandeiras.json');
        });

        app.get('/estado/:uf',function(req,res){
            console.log('Request Type:', req.method);
            var estado = {};
            fs.readFile(__dirname + '/estados-cidades.json', 'utf8', function(err, arquivo) {
                var estados = JSON.parse(arquivo);
                for(var x = 0; x < estados['estados'].length; x++){
                    if(estados['estados'][x].sigla.toLowerCase() == req.params.uf.toLowerCase() ){
                        console.log("Estado : " + estados['estados'][x].sigla.toLowerCase());
                        console.log("Estado UF : " + req.params.uf.toLowerCase());
                        estado = estados['estados'][x];
                        res.json(estado);
                        break;
                    }
                }
            });
        });
        app.listen(port,function(){
        console.log("Started on PORT " + port);
        })


#### <i class="icon-hdd"></i>  package.json

    {
    "name": "lab14",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start-data-server": "node app.js",
        "start-app-server": "node server.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "body-parser": "^1.17.2",
        "express": "^4.15.3"
        }
    }

### <i class="icon-file"></i>Lab 14 01
       
> https://github.com/request/request
> http://blog.modulus.io/node.js-tutorial-how-to-use-request-module

#### <i class="icon-hdd"></i> index.js

        var express   	=   require("express");
        var bodyParser  =   require("body-parser");
        var request  	=   require("request");
        var app       	=   express();
        var exphbs  	= 	require('express-handlebars')

        app.use(bodyParser.urlencoded({ extended: false }));
        app.engine('handlebars', exphbs({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');



        app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });

        app.get('/',function(req,res){
            res.sendFile(__dirname + '/index.html');
        });

        app.get('/home/', function (req, res) {
            res.render('home',{
                title: 'Pagina Inicial'
            });
        });

        app.get('/usuario/:nome', function (req, res) {
            res.render('home',{
                title: 'Olá' + req.params.nome
            });
        });

        app.get('/ip/', function (req, res) {
            request.get({
                url: 'https://ipinfo.io/json'
            }, function (err, res2) {
                res.json(JSON.parse(res2.body));
            });
        });


        app.post('/login',function(req,res){
            var user_name=req.body.user;
            var password=req.body.password;
            console.log("From Client pOST request: User name = " + user_name + " and password is " + password);
            res.end("yes");
        });


        app.listen(3000,function(){
            console.log("Started on PORT 3000");
        })


#### <i class="icon-hdd"></i>  index.html

        <html>
        <head>
            <title>Lab14 01</title>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
            <script>
            $(document).ready(function(){
                var user,pass;
                $("#submit").click(function(){
                user=$("#user").val();
                pass=$("#password").val();
                $.post("http://localhost:3000/login",{user: user,password: pass}, function(data){
                    if(data==='done')
                    {
                        alert("login success");
                    }
                });
                });
            });
            </script>
        </head>
        <body>
            <h1>Bem vindo</h1>
            <input type="text" id="user" size="40"><br>
            <input type="password" id="password" size="40"><br>
            <input type="button" id="submit" value="Submit">
        </body>
        </html>



#### <i class="icon-hdd"></i>  package.json

    {
    "name": "lab14",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "body-parser": "^1.17.2",
        "express": "^4.15.3",
        "express-handlebars": "^3.0.0",
        "request": "^2.75.0"
        }
    }









