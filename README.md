# Simulador de Empréstimo

Aplicação desenvolvida em Angular para simular empréstimos com base na Tabela Price, exibindo o valor da parcela mensal, o total pago, o total de juros e a evolução da amortização ao longo das parcelas.

Este projeto foi criado com foco em portfólio, organização de código e demonstração de fundamentos importantes de Angular, como componentes, data binding, services, tipagem com interfaces e separação de responsabilidades.

## Objetivo

Construir um simulador simples, visualmente limpo e tecnicamente consistente para praticar:

- Angular básico e boas práticas de estrutura
- Lógica financeira aplicada
- Organização de UI e regras de negócio
- Escrita de código mais próxima de um projeto profissional

## Funcionalidades

- Simulação de empréstimo com:
  - valor do empréstimo
  - taxa de juros mensal
  - número de parcelas
- Cálculo da parcela mensal usando a Tabela Price
- Exibição de:
  - parcela mensal
  - total pago
  - total de juros
- Tabela de amortização parcela a parcela
- Validação básica dos campos
- Formatação de moeda no padrão brasileiro

## Fórmula Utilizada

A aplicação usa a fórmula da Tabela Price:

```text
PMT = PV * (i * (1 + i)^n) / ((1 + i)^n - 1)
```

Onde:

- `PV` = valor presente do empréstimo
- `i` = taxa de juros mensal em formato decimal
- `n` = número total de parcelas

## Tecnologias

- Angular 21
- TypeScript
- SCSS
- Angular Forms
- Vitest

## Estrutura do Projeto

```text
src/
  app/
    components/
      loan-simulator/
        loan-simulator.ts
        loan-simulator.html
        loan-simulator.scss
    models/
      loan.models.ts
    services/
      loan.service.ts
      loan.service.spec.ts
```

## Decisões Técnicas

- A lógica de cálculo foi isolada em `loan.service.ts` para manter o componente mais enxuto.
- As entradas e saídas da simulação foram tipadas com interfaces para maior clareza e manutenção.
- O componente concentra a interação com a interface e delega as regras de negócio ao service.
- A tabela de amortização é gerada dinamicamente a partir do resultado da simulação.
- O valor do empréstimo usa formatação visual em moeda brasileira para melhorar a experiência de uso.

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

### 2. Entrar na pasta do projeto

```bash
cd simulador-emprestimo
```

### 3. Instalar as dependências

No Windows PowerShell, prefira:

```powershell
npm.cmd install
```

Ou, em terminais sem a restrição do PowerShell:

```bash
npm install
```

### 4. Rodar o servidor de desenvolvimento

```powershell
npm.cmd start
```

Depois, abra no navegador:

```text
http://localhost:4200
```

## Scripts Disponíveis

- `npm.cmd start` inicia o servidor local
- `npm.cmd run build` gera a versão de produção
- `npm.cmd run test -- --watch=false` executa os testes

## Testes

O projeto possui testes cobrindo a lógica principal do service, incluindo:

- cálculo da parcela com juros
- cenário sem juros
- geração da tabela de amortização

Para rodar:

```powershell
npm.cmd run test -- --watch=false
```

## Melhorias Futuras

- Adicionar gráfico para visualização da amortização
- Melhorar máscara e experiência dos inputs
- Permitir comparação entre cenários
- Exportar resultado da simulação
- Adicionar responsividade e refinamentos visuais extras

## Aprendizados Demonstrados

Este projeto evidencia prática com:

- criação de componentes standalone
- uso de `[(ngModel)]`
- event binding com `(click)` e `(input)`
- separação entre interface e regra de negócio
- tipagem com TypeScript
- formatação e apresentação de dados financeiros

## Autor

Projeto desenvolvido por Igor como parte de preparação para oportunidades com foco em Angular.
