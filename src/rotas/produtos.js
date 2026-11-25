// src/rotas/produtos.js - o cardápio pela internet
import { Router } from "express";
import { listarAtivos, buscarProduto } from "../dados/cardapio.js";
import { ErroNaoEncontrado } from "../erros.js";

const rotas = Router();

// GET /produtos: os pratos ativos hoje
rotas.get("/produtos", (req, res) => {
  res.json(listarAtivos());
});

// GET /produtos/3: um prato pelo id
rotas.get("/produtos/:id", (req, res) => {
  const produto = buscarProduto(Number(req.params.id));
  if (!produto) {
    throw new ErroNaoEncontrado(`prato ${req.params.id} não existe`);
  }
  res.json(produto);
});

export default rotas;
