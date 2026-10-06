# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Coordenação pedagógica da Escola Estadual Coronel Ary Gomes (PEI, integral 9h). Usa o
sistema com pressa, no início da manhã, quando chegam as faltas do dia — às vezes no
computador da secretaria, às vezes de pé no corredor, pelo celular.

## Product Purpose

Decidir, em poucos minutos, quem cobre cada aula dos professores que faltaram, seguindo
regras de equidade conhecidas por todos, e distribuir essa decisão para a escola.
Sucesso é a escala do dia publicada antes da primeira aula (07:10), sem ninguém
sobrecarregado e sem aula descoberta em silêncio.

## Positioning

A escala não é sorteio nem favor: cada substituto é escolhido por uma cascata explícita
(quem ainda não substituiu hoje → nível hierárquico → afinidade de disciplina/área →
menos aulas no dia → histórico), com teto rígido de 32 aulas semanais. O sistema mostra
por que cada pessoa foi escolhida.

## Operating Context

- Entrada: a lista de quem faltou, marcada na hora.
- Saídas: mensagem de WhatsApp para o grupo da escola, impressão A4 em uma folha para
  afixar, e planilha Excel.
- A grade de horários vem da escola em PDF e é regerada por `generatePdfData.mjs`.
- Multiplica SP (1h30), ATPC, eletivas e tutoria bloqueiam horários.

## Capabilities and Constraints

- Sem backend; estado em Context API e `localStorage`.
- **Oficializar é a única ação irreversível**: grava no histórico e soma nos contadores.
  Gerar, imprimir, copiar para o WhatsApp e exportar não gravam nada.
- Sem candidato elegível, a aula fica **sem cobertura**, visível — nunca se estoura a carga
  de alguém em silêncio.
- Áreas de conhecimento no modelo da escola: Linguagens, Ciências da Natureza (inclui
  Matemática), Ciências Humanas, Parte Diversificada, Gestão Escolar.
- Níveis: Professor → Coordenador de Área (PCA) → Equipe Gestora.

## Evidence on Hand

- Dados reais de 26 professores e 14 turmas em `src/data/mockData.ts` (gerado; os PDFs de
  origem ficam fora do versionamento por conterem nomes reais).
- Regras e histórico de decisões em `CONTEXTO.md`.

## Product Principles

1. A escala é uma tabela: o que a tela mostra é o que vai para o papel e para o WhatsApp.
2. As regras ficam à vista. Cada escolha carrega o seu motivo.
3. Uma ação irreversível, claramente separada das reversíveis.
4. Trabalho extra não é competição: distribuição de carga, nunca ranking.
5. Funciona de pé, no celular, às 7h.

## Accessibility & Inclusion

Instituição pública: WCAG 2.1 AA. Contraste medido em todas as telas e estados do fluxo,
foco de teclado visível, piso de 12px para texto.
