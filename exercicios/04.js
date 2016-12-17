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