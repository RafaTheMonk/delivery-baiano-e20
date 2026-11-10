// src/regras.js - as regras do pedido da Dona Ju, em funções
// Dinheiro sempre em centavos inteiros.
// Nenhuma função daqui escreve na tela: recebe dados e devolve um resultado.

// Preços do cardápio da equipe, em centavos, na mesma ordem do index.html
const PRECOS = [1200, 1000, 4200, 3800, 1500, 600];
const PEDIDO_MINIMO = 3000;

// Soma preço vezes quantidade, prato por prato
function calcularSubtotal(precos, qtds) {
  let subtotal = 0;
  for (let i = 0; i < precos.length; i++) {
    subtotal += precos[i] * qtds[i];
  }
  return subtotal;
}

// Taxa de entrega pelo bairro; 0 quer dizer que não entregamos lá
function calcularTaxa(bairro) {
  switch (bairro) {
    case "Rio Vermelho":
      return 500;
    case "Barra":
      return 600;
    case "Pituba":
      return 700;
    case "Itapuã":
      return 900;
    default:
      return 0;
  }
}

// Cupom PRIMEIRA10: 10% nos itens, só na primeira compra
function calcularDesconto(subtotal, cupom, primeiraCompra) {
  return 0; // integrante 3
}

// Pedidos das 11h às 22h; 22h em ponto já recusa
function dentroDoHorario(hora) {
  return hora >= 11 && hora < 22;
}

// Devolve o motivo da recusa, ou "" quando o pedido pode seguir
function motivoDaRecusa(pedido) {
  return ""; // integrante 3
}

// Total: itens, menos o desconto, mais a taxa de entrega
function calcularTotal(pedido) {
  const subtotal = calcularSubtotal(PRECOS, pedido.qtds);
  const desconto = calcularDesconto(subtotal, pedido.cupom, pedido.primeiraCompra);
  const taxa = calcularTaxa(pedido.bairro);
  return subtotal - desconto + taxa;
}

module.exports = {
  calcularSubtotal,
  calcularTaxa,
  calcularDesconto,
  dentroDoHorario,
  motivoDaRecusa,
  calcularTotal,
};
