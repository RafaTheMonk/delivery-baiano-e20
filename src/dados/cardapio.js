// src/dados/cardapio.js - o cardápio da Dona Ju, lido da planilha cardapio.csv
// preco em centavos; estoque: quantos tem hoje; ativo: aparece no cardápio hoje
import path from "node:path";
import { lerCardapioCsv } from "./importarCardapio.js";

const CARDAPIO = await lerCardapioCsv(path.join(import.meta.dirname, "cardapio.csv"));

// Devolve o produto com esse id, ou undefined se não existir
function buscarProduto(id) {
  return CARDAPIO.find((produto) => produto.id === id);
}

// Devolve só os produtos ativos hoje
function listarAtivos() {
  return CARDAPIO.filter((produto) => produto.ativo);
}

export { CARDAPIO, buscarProduto, listarAtivos };
