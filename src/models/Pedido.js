// src/models/Pedido.js - o pedido da Dona Ju como classe
// Valida estoque e pedido mínimo, e calcula o total com as regras do regras.js.

import * as regras from "../regras.js";
import ItemPedido from "./ItemPedido.js";
import { ErroValidacao } from "../erros.js";

class Pedido {
  #itens = [];

  constructor(bairro, hora, cupom = "", primeiraCompra = false) {
    this.bairro = bairro;
    this.hora = hora;
    this.cupom = cupom;
    this.primeiraCompra = primeiraCompra;
    this.criadoEm = new Date();
  }

  adicionarItem(produto, qtd) {
    if (!produto.temEstoque(qtd)) {
      throw new ErroValidacao(`${produto.nome}: sem estoque para ${qtd}`);
    }
    this.#itens.push(new ItemPedido(produto, qtd));
  }

  // Devolve uma cópia: quem está fora não mexe na lista de verdade
  get itens() {
    return [...this.#itens];
  }

  subtotal() {
    return this.#itens.reduce((soma, item) => soma + item.subtotal(), 0);
  }

  // Lança um erro com o motivo, se o pedido não pode seguir
  validar() {
    if (regras.calcularTaxa(this.bairro) === 0) {
      throw new ErroValidacao(`não entregamos em ${this.bairro}`);
    }
    if (!regras.dentroDoHorario(this.hora)) {
      throw new ErroValidacao("pedidos só das 11h às 22h");
    }
    if (this.subtotal() < regras.PEDIDO_MINIMO) {
      throw new ErroValidacao("abaixo do mínimo de R$ 30,00 em itens");
    }
  }

  // Um objeto simples, que o JSON consegue gravar: o JSON não enxerga o #itens
  paraObjeto() {
    return {
      bairro: this.bairro,
      hora: this.hora,
      itens: this.#itens.map((item) => ({
        id: item.produto.id,
        nome: item.produto.nome,
        qtd: item.qtd,
        precoUnitario: item.precoUnitario,
      })),
      total: this.total(),
    };
  }

  // Total: itens, menos o desconto, mais a taxa. Valida antes.
  total() {
    this.validar();
    const subtotal = this.subtotal();
    const desconto = regras.calcularDesconto(subtotal, this.cupom, this.primeiraCompra);
    return subtotal - desconto + regras.calcularTaxa(this.bairro);
  }
}

export default Pedido;
