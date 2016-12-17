// a JSON array
["one", "two", "three"]

// a JSON object
{ "one": 1, "two": 2, "three": 3 }

var data = {
  name: "Jackson Mafra"
  , age: 34
  , title: "Instrutor de JavaScript"
}

var jsonStr = JSON.stringify(data);

console.log(jsonStr);

// prints '{"name":"Jackson Mafra","age":34,"title":"Instrutor de JavaScript"}'

var jsonStr = '{"name":"Jackson Mafra","age":34,"title":"Instrutor de JavaScript"}';

var data = JSON.parse(jsonStr);

console.log(data.title);

// prints 'Instrutor de JavaScript'

var util = require('util')
util.inspect(console)

console.log('This script is:', __filename);
console.log(__filename, process.title, process.argv);

var name = 'Jackson',
number = 34,
myObj = {
propOne: 'stuff',
propTwo: 'more stuff'
};
 console.log('My name is %s, my number is %d, my object is %j', name, number, myObj);

/*Tempo de Execução*/
 console.time('myTimer');
 var string = '';
 for (var i = 0; i < 300; i++) {
   (function (i) {
     string += 'aaaa' + i.toString();
   })(i);
 }
 console.timeEnd('myTimer');