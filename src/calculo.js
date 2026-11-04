// src/calculo.js - o total de um pedido do delivery
// Dinheiro sempre em centavos inteiros. R$ só na hora de mostrar.

const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Cardápio: a posição de cada prato é a mesma nas duas listas
const PRATOS = ["Acarajé", "Abará", "Moqueca de peixe", "Bobó de camarão", "Vatapá", "Cocada"];
const PRECOS = [1200, 1000, 4200, 3800, 1500, 600]; // centavos

// O pedido: quantas unidades de cada prato, na mesma ordem do cardápio
const qtds = [2, 1, 0, 0, 0, 1];
const bairro = "Barra";

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
  default:
    console.log(`Não entregamos em ${bairro}.`);
}
const total = subtotal + taxa;
console.log(`Taxa:  ${reais.format(taxa / 100)}`);
console.log(`Total: ${reais.format(total / 100)}`);

// Regras do pedido: true ou false, ainda sem if
const PEDIDO_MINIMO = 3000;
const hora = 12;
const atingiuMinimo = subtotal >= PEDIDO_MINIMO;
const dentroDoHorario = hora >= 11 && hora < 22;
const podeEnviar = atingiuMinimo && dentroDoHorario;
console.log(`Atingiu o mínimo de ${reais.format(PEDIDO_MINIMO / 100)}? ${atingiuMinimo}`);
console.log(`Dentro do horário? ${dentroDoHorario}`);
console.log(`Pode enviar o pedido? ${podeEnviar}`);
