### <i class="icon-file"></i>Lab 04

    function ola(texto) {
      console.log(texto);
    }

    function execute(minhaFuncao, valor) {
      minhaFuncao(valor);
    }

    execute(ola, "Hello");

    function execute(minhaFuncao, valor) {
      minhaFuncao(valor);
    }

    execute(function(texto){ console.log(texto) }, "Hello");


#### <i class="icon-hdd"></i>  Modulos

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