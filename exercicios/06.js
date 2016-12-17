/*
	Modulos
*/
var contato = require('./contato');
contato.ola();

/*No arquivo contato.js*/
exports.ola = function() {
  console.log('Entrando em contato');
}

/*
module.exports = function() {
  // ...
}
*/