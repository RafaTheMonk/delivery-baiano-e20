# delivery-baiano-e20
Projeto api de delivery para a aula de back end

## Como rodar

Na pasta do repositório:

    npm install
    npm start                    # monta dois pedidos com as classes
    npm run dev                  # o mesmo, rodando de novo cada vez que salvar
    npm test                     # confere as regras e o cardápio
    node src/pedido-agora.js     # um pedido com a hora de agora

## Bibliotecas

| Biblioteca | Versão | Para quê | Licença |
|---|---|---|---|
| dayjs | ^1.11.23 | data e hora do pedido em português | MIT |

## npm audit

Rodado em 18/11/2026: `found 0 vulnerabilities`.

## Pedidos em arquivo

Os pedidos ficam em data/pedidos.json (fora do Git: cada máquina tem os seus).

    node src/salvar-pedido.js    # grava um pedido novo, com o próximo número
    node src/listar-pedidos.js   # mostra os pedidos gravados

## Testes manuais (Aula 14)

| # | O que fiz | Esperado | Deu certo? |
|---|---|---|---|
| 1 | Apaguei a pasta data e rodei node src/listar-pedidos.js | 0 pedido(s) no arquivo | sim |
| 2 | node src/salvar-pedido.js | Pedido 1 gravado: 3 pratos, R$ 46,00 | sim |
| 3 | node src/salvar-pedido.js de novo | Pedido 2 gravado | sim |
| 4 | Fechei o terminal, abri outro e rodei node src/listar-pedidos.js | 2 pedido(s) no arquivo, #1 e #2 | sim |
| 5 | Busquei o pedido 99 | O pedido 99 não existe | sim |
