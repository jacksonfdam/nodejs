var express   	=   require("express");
var bodyParser  =   require("body-parser");
var app       	=   express();
var port 		= 	4000;
var fs 			= 	require('fs');
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
  	res.sendFile(__dirname + '/estados-cidades.json');
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
