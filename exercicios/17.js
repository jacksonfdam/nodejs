var http = require('http'),
    queryString = require('querystring');

http.createServer(function (request, response) {
    var oQueryParams;
    if (request.url.indexOf('?') >= 0) {
        oQueryParams = queryString.parse(request.url.replace(/^.*\?/, ''));
        console.log(oQueryParams);
    }
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end('Exibindo...');
}).listen(8000, '127.0.0.1');