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

// Os 5 cenários do pedido. A conta de cada um foi feita no papel antes.
const pedido1 = { qtds: [2, 1, 0, 0, 0, 1], bairro: "Barra", hora: 12, primeiraCompra: false, cupom: "" };
const pedido2 = { qtds: [0, 0, 0, 0, 2, 0], bairro: "Rio Vermelho", hora: 19, primeiraCompra: true, cupom: "PRIMEIRA10" };
const pedido3 = { qtds: [1, 0, 0, 0, 0, 1], bairro: "Pituba", hora: 12, primeiraCompra: false, cupom: "" };
const pedido4 = { qtds: [0, 0, 1, 0, 0, 0], bairro: "Itapuã", hora: 22, primeiraCompra: false, cupom: "" };
const pedido5 = { qtds: [0, 0, 0, 1, 0, 0], bairro: "Liberdade", hora: 13, primeiraCompra: false, cupom: "" };

console.assert(regras.motivoDaRecusa(pedido1) === "", "1: pedido comum é aceito");
console.assert(regras.calcularTotal(pedido1) === 4600, "1: total R$ 46,00");
console.assert(regras.motivoDaRecusa(pedido2) === "", "2: no limite do mínimo é aceito");
console.assert(regras.calcularTotal(pedido2) === 3200, "2: total R$ 32,00 com o cupom");
console.assert(regras.motivoDaRecusa(pedido3) === "abaixo do mínimo de R$ 30,00 em itens", "3: abaixo do mínimo");
console.assert(regras.motivoDaRecusa(pedido4) === "pedidos só das 11h às 22h", "4: 22h em ponto");
console.assert(regras.motivoDaRecusa(pedido5) === "não entregamos em Liberdade", "5: fora da área");

console.log("Fim. Se nenhum Assertion failed apareceu acima, tudo passou.");
