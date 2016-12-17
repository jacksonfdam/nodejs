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

/*

var fs = require('fs');

fs.readFile('example.file', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
});


var data = fs.readFileSync('example.file','utf8');
console.log(data);


*/