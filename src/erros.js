// src/erros.js - os erros do delivery, cada um com o seu nome

// Dado que não serve: preço negativo, sem estoque, fora do horário...
export class ErroValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "ErroValidacao";
  }
}

// Procurou e não achou: pedido ou prato que não existe
export class ErroNaoEncontrado extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "ErroNaoEncontrado";
  }
}
