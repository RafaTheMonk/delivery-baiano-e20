// src/models/ItemPedido.js - um prato dentro do pedido, com a quantidade
// Guarda o preço do dia: se o cardápio mudar amanhã, este pedido não muda.

class ItemPedido {
  constructor(produto, qtd) {
    if (!Number.isInteger(qtd) || qtd < 1) {
      throw new Error(`quantidade inválida: ${qtd}`);
    }
    this.produto = produto;
    this.qtd = qtd;
    this.precoUnitario = produto.preco;
  }

  subtotal() {
    return this.precoUnitario * this.qtd;
  }
}

module.exports = ItemPedido;
