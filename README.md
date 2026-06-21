# Vacina Kids

Aplicação web em Angular para acompanhar a caderneta de vacinação infantil. A interface mostra a criança ativa, um resumo do status vacinal, a carteira com as doses previstas e aplicadas, além de campanhas em andamento.

<img width="1130" height="816" alt="image" src="https://github.com/user-attachments/assets/a08724da-53a5-452c-85fb-6d88155b7747" />

## Visão Geral

O software foi pensado como um painel simples para:

- selecionar a criança ativa
- visualizar idade e status vacinal
- cadastrar novas crianças
- registrar vacinas aplicadas
- acompanhar campanhas relevantes

O estado principal da aplicação fica centralizado em `VaccineService`, que alimenta os componentes de tela com dados derivados de `children`, `records`, `selectedChild` e `vaccinePlan`.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- npm disponível no ambiente

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm start
```

Depois, acesse:

```bash
http://localhost:4200
```

### Build de produção

```bash
npm run build
```

O resultado é gerado em `dist/vacina-kids`.

### Testes

```bash
npm run test
```

Se quiser rodar os testes em modo assistido:

```bash
npm run test -- --watch
```

## Tecnologias Utilizadas

- Angular 21
- TypeScript
- RxJS
- Angular Router
- Angular Forms
- Vitest
- JSDOM
- Zone.js
- npm

## Estrutura do Projeto

```text
src/
  app/
    app.ts
    app.html
    app.css
    app.routes.ts
    app.config.ts
    data/
      mock-data.ts
    models/
      vaccine.models.ts
    services/
      vaccine.service.ts
      vaccine.service.spec.ts
    components/
      app-header/
      navigation-tabs/
      child-summary/
      dashboard-view/
      children-view/
      wallet-view/
      campaigns-view/
  styles.css
public/
  syringe.svg
  syringe.ico
```

### Responsabilidades principais

- `src/app/app.ts`: componente raiz que compõe cabeçalho, navegação, resumo e conteúdo da rota
- `src/app/app.routes.ts`: define as rotas da aplicação
- `src/app/services/vaccine.service.ts`: concentra o estado e os cálculos de negócio
- `src/app/data/mock-data.ts`: dados iniciais de crianças, vacinas, campanhas e registros
- `src/app/models/vaccine.models.ts`: tipos e interfaces do domínio

## Rotas

| Rota | Componente | Finalidade |
|---|---|---|
| `/resumo` | `DashboardViewComponent` | Exibe próximas vacinas e campanhas ativas |
| `/criancas` | `ChildrenViewComponent` | Lista crianças e permite novo cadastro |
| `/carteira` | `WalletViewComponent` | Mostra a carteira vacinal e permite registrar doses |
| `/campanhas` | `CampaignsViewComponent` | Exibe campanhas de vacinação |
| `/` | redireciona para `/resumo` | Entrada padrão da aplicação |
| `**` | redireciona para `/resumo` | Fallback para rotas inválidas |

## Componentes

### `App`

Componente raiz. Monta:

- `AppHeaderComponent`
- `NavigationTabsComponent`
- `ChildSummaryComponent`
- `router-outlet`

### `AppHeaderComponent`

Mostra:

- o nome da aplicação
- o logo `syringe`
- o seletor da criança ativa

### `NavigationTabsComponent`

Barra de navegação principal entre:

- Resumo
- Crianças
- Carteira
- Campanhas

### `ChildSummaryComponent`

Exibe a criança selecionada, a idade calculada e os totais de:

- vacinas aplicadas
- vacinas pendentes
- vacinas atrasadas

### `DashboardViewComponent`

Painel inicial com:

- próximas vacinas
- campanhas ativas e sua relevância para a criança selecionada

### `ChildrenViewComponent`

Responsável por:

- listar crianças cadastradas
- trocar a criança ativa
- cadastrar uma nova criança com validação básica

### `WalletViewComponent`

Mostra a carteira vacinal da criança ativa com filtros:

- todas
- aplicadas
- pendentes
- atrasadas

Também permite registrar uma vacina como aplicada.

### `CampaignsViewComponent`

Lista campanhas disponíveis com informações de período e público-alvo.

## Dados e Regras

- A criança ativa é controlada por `selectedChildId`
- A idade é calculada a partir da data de nascimento
- A carteira vacinal é derivada dos registros e das vacinas recomendadas
- O registro de aplicação evita duplicidade para a mesma criança e vacina

## Observações

- A aplicação usa dados mockados em memória
- Não há backend conectado neste repositório
- Os assets visuais ficam em `public/`

