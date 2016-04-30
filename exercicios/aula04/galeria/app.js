// app.js
// Utilizaremos: Express, Jade e File System.
var express = require('express')
  , fs = require('fs')
  , app = express();

// Path da pasta pública que armazenará as fotos.
var path_public = __dirname + '/public';

// Configurações mínimas no Express
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.static(path_public));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

// Rota da página inicial.
app.get('/', function(req, res){
  // Retorna um array com string dos arquivos da pasta pública.
  fs.readdir(path_public, function(err, fotos){
    res.render('index', {fotos: fotos});
  });
});

// Rota que recebe upload das fotos.
app.post('/enviar-foto', function(req, res){
  var path_atual = req.files.foto.path;
  var path_image = path_public + '/' + req.files.foto.name;
  
  // Move a foto atual para a pasta pública.
  fs.rename(path_atual, path_image, function(err){
    // Exclui a foto da pasta temporária.
    fs.unlink(path_atual, function(err){
      res.redirect('/');
    });		
  });	
});

app.listen(3000, function() {
  console.log('Galeria de fotos em execucao...');
});