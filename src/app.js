// src/app.js - o servidor do Delivery: middlewares, rotas e erros
import express from "express";
import path from "node:path";
import rotasProdutos from "./rotas/produtos.js";
import rotasPedidos from "./rotas/pedidos.js";
import { ErroValidacao, ErroNaoEncontrado } from "./erros.js";

const app = express();

// 1. O log: toda requisição passa aqui primeiro
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 2. O corpo em JSON vira objeto no req.body
app.use(express.json());

// 3. As páginas da pasta public: http://localhost:3000/ abre o index.html
app.use(express.static(path.join(import.meta.dirname, "..", "public")));

// 4. As rotas
app.use(rotasProdutos);
app.use(rotasPedidos);

// 5. Nenhuma rota atendeu: 404
app.use((req, res) => {
  res.status(404).json({ erro: `rota não encontrada: ${req.method} ${req.url}` });
});

// 6. A central de erros: cada erro com o seu status
app.use((erro, req, res, next) => {
  if (erro instanceof ErroValidacao) {
    return res.status(400).json({ erro: erro.message });
  }
  if (erro instanceof ErroNaoEncontrado) {
    return res.status(404).json({ erro: erro.message });
  }
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "o corpo não é um JSON válido" });
  }
  console.error(erro); // o detalhe fica só no terminal
  res.status(500).json({ erro: "erro interno, tente de novo em instantes" });
});

export default app;
