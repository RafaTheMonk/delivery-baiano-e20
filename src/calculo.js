// src/calculo.js - o total de um pedido do delivery
// Dinheiro sempre em centavos inteiros. R$ só na hora de mostrar.
// Rodar na pasta do repositório: node src/calculo.js

const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Cardápio: a posição de cada prato é a mesma nas duas listas
const PRATOS = ["Acarajé", "Abará", "Moqueca de peixe", "Bobó de camarão", "Vatapá", "Cocada"];
const PRECOS = [1200, 1000, 4200, 3800, 1500, 600]; // centavos

const PEDIDO_MINIMO = 3000;

// Cenários de teste: a posição c é o mesmo pedido em todas as listas
const QUANTIDADES = [
  [2, 1, 0, 0, 0, 1], // 1. pedido comum
  [0, 0, 0, 0, 2, 0], // 2. primeira compra com cupom, no limite do mínimo
  [1, 0, 0, 0, 0, 1], // 3. abaixo do mínimo
  [0, 0, 1, 0, 0, 0], // 4. 22:00 em ponto
  [0, 0, 0, 1, 0, 0], // 5. bairro fora da área
];
const BAIRROS = ["Barra", "Rio Vermelho", "Pituba", "Itapuã", "Liberdade"];
const HORAS = [12, 19, 12, 22, 13];
const PRIMEIRA_COMPRA = [false, true, false, false, false]; // ainda sem cadastro
const CUPONS = ["", "PRIMEIRA10", "", "", ""];

for (let c = 0; c < QUANTIDADES.length; c++) {
  const qtds = QUANTIDADES[c];
  const bairro = BAIRROS[c];
  const hora = HORAS[c];
  console.log(`\nCenário ${c + 1}: ${bairro}, ${hora}h`);

  // Subtotal: preço vezes quantidade, prato por prato
  let subtotal = 0;
  let totalItens = 0;
  for (let i = 0; i < PRECOS.length; i++) {
    if (qtds[i] === 0) {
      continue; // prato que não foi pedido não aparece
    }
    subtotal += PRECOS[i] * qtds[i];
    totalItens += qtds[i];
    console.log(`  ${qtds[i]} x ${PRATOS[i]}`);
  }
  const palavra = totalItens === 1 ? "item" : "itens";
  console.log(`${totalItens} ${palavra}: ${reais.format(subtotal / 100)}`);

  // Taxa de entrega pelo bairro (0 = não entregamos lá)
  let taxa = 0;
  switch (bairro) {
    case "Rio Vermelho":
      taxa = 500;
      break;
    case "Barra":
      taxa = 600;
      break;
    case "Pituba":
      taxa = 700;
      break;
    case "Itapuã":
      taxa = 900;
      break;
  }

  // Regras: mínimo sobre os itens, antes do desconto; 22:00 em ponto já recusa
  if (taxa === 0) {
    console.log(`Recusado: não entregamos em ${bairro}.`);
  } else if (hora < 11 || hora >= 22) {
    console.log("Recusado: pedidos só das 11h às 22h.");
  } else if (subtotal < PEDIDO_MINIMO) {
    const falta = PEDIDO_MINIMO - subtotal;
    console.log(`Recusado: faltam ${reais.format(falta / 100)} para o mínimo de ${reais.format(PEDIDO_MINIMO / 100)}.`);
  } else {
    // Cupom PRIMEIRA10: 10% nos itens, só na primeira compra; a taxa não tem desconto
    const temDesconto = PRIMEIRA_COMPRA[c] && CUPONS[c] === "PRIMEIRA10";
    const desconto = temDesconto ? Math.round((subtotal * 10) / 100) : 0;
    const total = subtotal - desconto + taxa;
    if (desconto > 0) {
      console.log(`Desconto: ${reais.format(-desconto / 100)}`);
    }
    console.log(`Taxa:  ${reais.format(taxa / 100)}`);
    console.log(`Total: ${reais.format(total / 100)}`);
  }
}
