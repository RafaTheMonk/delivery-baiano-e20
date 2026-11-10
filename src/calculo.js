// src/calculo.js - mostra os pedidos na tela usando as regras do regras.js
// Rodar na pasta do repositório: node src/calculo.js

const regras = require("./regras.js");
const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function mostrarPedido(pedido) {
  const motivo = regras.motivoDaRecusa(pedido);
  if (motivo === "") {
    const total = regras.calcularTotal(pedido);
    console.log(`${pedido.bairro}, ${pedido.hora}h: total ${reais.format(total / 100)}`);
  } else {
    console.log(`${pedido.bairro}, ${pedido.hora}h: recusado, ${motivo}.`);
  }
}

mostrarPedido({ qtds: [2, 1, 0, 0, 0, 1], bairro: "Barra", hora: 12, primeiraCompra: false, cupom: "" });
mostrarPedido({ qtds: [0, 0, 0, 0, 2, 0], bairro: "Rio Vermelho", hora: 19, primeiraCompra: true, cupom: "PRIMEIRA10" });
mostrarPedido({ qtds: [1, 0, 0, 0, 0, 1], bairro: "Pituba", hora: 12, primeiraCompra: false, cupom: "" });
mostrarPedido({ qtds: [0, 0, 1, 0, 0, 0], bairro: "Itapuã", hora: 22, primeiraCompra: false, cupom: "" });
mostrarPedido({ qtds: [0, 0, 0, 1, 0, 0], bairro: "Liberdade", hora: 13, primeiraCompra: false, cupom: "" });
