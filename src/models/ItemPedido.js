// src/models/ItemPedido.js - um prato dentro do pedido, com a quantidade
// Guarda o preço do dia: se o cardápio mudar amanhã, este pedido não muda.

import { ErroValidacao } from "../erros.js";

class ItemPedido {
  constructor(produto, qtd) {
    if (!Number.isInteger(qtd) || qtd < 1) {
      throw new ErroValidacao(`quantidade inválida: ${qtd}`);
    }
    this.produto = produto;
    this.qtd = qtd;
    this.precoUnitario = produto.preco;
  }

  subtotal() {
    return this.precoUnitario * this.qtd;
  }
}

export default ItemPedido;
