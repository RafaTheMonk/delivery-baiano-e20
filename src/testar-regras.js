// src/testar-regras.js - confere as regras do regras.js
// Rodar na pasta do repositório: node src/testar-regras.js
// console.assert fica quieto quando a regra acerta e avisa quando erra.

const regras = require("./regras.js");

console.log("Testando as regras...");

// Cada regra sozinha, com dados de exemplo
console.assert(regras.calcularSubtotal([1200, 600], [2, 1]) === 3000, "subtotal: 2 x R$ 12,00 + 1 x R$ 6,00");
console.assert(regras.calcularTaxa("Lua") === 0, "bairro fora da área não tem taxa");
console.assert(regras.calcularDesconto(3000, "PRIMEIRA10", true) === 300, "PRIMEIRA10 dá 10% na primeira compra");
console.assert(regras.calcularDesconto(3000, "PRIMEIRA10", false) === 0, "PRIMEIRA10 só vale na primeira compra");
console.assert(regras.dentroDoHorario(11) === true, "11h em ponto aceita");
console.assert(regras.dentroDoHorario(22) === false, "22h em ponto recusa");

// Os 5 cenários do pedido: Passo 5

console.log("Fim. Se nenhum Assertion failed apareceu acima, tudo passou.");
