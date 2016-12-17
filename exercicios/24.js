//Sync:

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('file', 'utf8'));

//Async:

var fs = require('fs');
var obj;
fs.readFile('file', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});


user.json

{
  "firstName": "Joe",
  "lastName": "Smith"
}

var config = require('./user.json');
console.log(config.firstName + ' ' + config.lastName);


var str = '{ "name": "John Doe", "age": 42 }';
var json = JSON.parse(str);

fs.readFile('/path/to/file.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var json = JSON.parse(data);
});

var json = JSON.parse(fs.readFileSync('/path/to/file.json', 'utf8'));

/*
https://www.npmjs.com/package/jsonfile
*/

var jf = require('jsonfile');

// asynchronous version
jf.readFile('/path/to/file.json', function(err, obj) {
  // obj contains JSON data
});

// synchronous version
var obj = jf.readFileSync(file);