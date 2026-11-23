// src/relatorios/exportarCsv.js - os pedidos do arquivo viram planilha
// Rodar na pasta do repositório: node src/relatorios/exportarCsv.js
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { listar } from "../repositories/pedidoArquivoRepository.js";

const PASTA = path.join(import.meta.dirname, "..", "..", "data");
const ARQUIVO = path.join(PASTA, "relatorio-pedidos.csv");

// Texto com ; ou aspas vai entre aspas, e a aspa de dentro dobra
function campo(valor) {
  const texto = String(valor ?? "");
  if (texto.includes(";") || texto.includes('"') || texto.includes("\n")) {
    return `"${texto.replaceAll('"', '""')}"`;
  }
  return texto;
}

// 2026-11-18T11:40:00.000Z vira 18/11/2026 08:40
function dataBr(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const dia = d.toLocaleDateString("pt-BR");
  const hora = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${dia} ${hora}`;
}

// 4600 vira 46,00 (vírgula: o Excel em português lê como número)
function reaisCsv(centavos) {
  return (centavos / 100).toFixed(2).replace(".", ",");
}

const pedidos = await listar();
const linhas = ["id;data;cliente;bairro;total;status"];
for (const p of pedidos) {
  const colunas = [
    p.id, dataBr(p.criadoEm), p.cliente, p.bairro, reaisCsv(p.total), p.status ?? "recebido",
  ];
  linhas.push(colunas.map(campo).join(";"));
}

await mkdir(PASTA, { recursive: true });
await writeFile(ARQUIVO, "\uFEFF" + linhas.join("\n") + "\n", "utf-8");
console.log(`${pedidos.length} pedido(s) em ${ARQUIVO}`);
