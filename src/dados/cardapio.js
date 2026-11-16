// src/dados/cardapio.js - o cardápio da Dona Ju como array de objetos
// preco em centavos; estoque: quantos tem hoje; ativo: aparece no cardápio hoje

const CARDAPIO = [
  { id: 1, nome: "Acarajé", preco: 1200, estoque: 30, ativo: true },
  { id: 2, nome: "Abará", preco: 1000, estoque: 20, ativo: true },
  { id: 3, nome: "Moqueca de peixe", preco: 4200, estoque: 8, ativo: true },
  { id: 4, nome: "Bobó de camarão", preco: 3800, estoque: 0, ativo: false },
  { id: 5, nome: "Vatapá", preco: 1500, estoque: 15, ativo: true },
  { id: 6, nome: "Cocada", preco: 600, estoque: 40, ativo: true },
];

// Devolve o produto com esse id, ou undefined se não existir
function buscarProduto(id) {
  return CARDAPIO.find((produto) => produto.id === id);
}

// Devolve só os produtos ativos hoje
function listarAtivos() {
  return CARDAPIO.filter((produto) => produto.ativo);
}

export { CARDAPIO, buscarProduto, listarAtivos };
