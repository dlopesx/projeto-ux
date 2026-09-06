# Arquitetura de Informação e Fluxo do Usuário

## 1) **Arquitetura de Informação (Sitemap)**

### Telas e seções principais

- **Tela Inicial**
  - Login
  - Cadastro

- **Dashboard / Home**

- **Registro de Vacinas e Consultas**

### Sitemap

```mermaid
graph TD
    A["Sistema de Monitoramento de Animais de Estimação"]

    A --> B["Tela Inicial"]
    B --> B1["Login"]
    B --> B2["Cadastro"]

    B1 --> C["Dashboard / Home"]
    B2 --> C

    C --> D["Registro de Vacinas e Consultas"]
```

### Justificativa da organização

A arquitetura de informação foi organizada de forma simples e centralizada, considerando as necessidades identificadas nas personas e na pesquisa realizada com os usuários.

A tela inicial concentra as opções de login e cadastro, permitindo que o usuário acesse a plataforma antes de utilizar suas funcionalidades. Após a autenticação, o usuário é direcionado para o Dashboard, que funciona como a tela principal da aplicação e permite uma visualização central das informações relacionadas aos cuidados dos animais.

A partir do Dashboard, o usuário pode acessar o registro de vacinas e consultas. Essa organização busca facilitar a navegação e reduzir o tempo necessário para encontrar funcionalidades importantes, considerando que as personas possuem rotinas ocupadas e apresentam dificuldades relacionadas à organização e ao esquecimento dos cuidados dos pets.

A estrutura também poderá ser adaptada durante o desenvolvimento da aplicação, principalmente em relação à forma de acesso aos registros, que poderá utilizar componentes da interface web, como páginas ou elementos sobrepostos.

## 2) **Fluxo do Usuário (User Flow)**

### User Flow — Cadastrar um pet

**Funcionalidade:** permitir que o usuário cadastre um animal de estimação na plataforma.

**Objetivo do usuário:** registrar as informações do pet para possibilitar o acompanhamento e a organização de seus cuidados.

```mermaid
flowchart TD
    A([Início]) --> B[Acessar o Dashboard]
    B --> C[Selecionar cadastrar pet]
    C --> D[Preencher os dados do pet]
    D --> E{Dados válidos?}

    E -->|Não| F[Corrigir informações]
    F --> D

    E -->|Sim| G[Confirmar cadastro]
    G --> H[Pet cadastrado com sucesso]
    H --> I([Fim])
```

### User Flow — Registrar vacinas e consultas

**Funcionalidade:** permitir que o usuário registre informações sobre vacinas e consultas relacionadas ao seu pet.

**Objetivo do usuário:** manter os cuidados de saúde do animal registrados e organizados na plataforma.

```mermaid
flowchart TD
    A([Início]) --> B[Acessar o Dashboard]
    B --> C[Selecionar o pet]
    C --> D[Selecionar registrar cuidado]
    D --> E{Qual registro deseja realizar?}

    E -->|Vacina| F[Preencher informações da vacina]
    E -->|Consulta| G[Preencher informações da consulta]

    F --> H{Dados válidos?}
    G --> H

    H -->|Não| I[Corrigir informações]
    I --> E

    H -->|Sim| J[Confirmar registro]
    J --> K[Registro realizado com sucesso]
    K --> L([Fim])
```

### User Flow — Visualizar lembretes no Dashboard

**Funcionalidade:** permitir que o usuário visualize os lembretes relacionados aos cuidados pendentes de seus pets.

**Objetivo do usuário:** acompanhar rapidamente os cuidados que precisam ser realizados para evitar esquecimentos.

```mermaid
flowchart TD
    A([Início]) --> B[Acessar o Dashboard]
    B --> C[Localizar a seção de lembretes]
    C --> D{Existem lembretes pendentes?}

    D -->|Sim| E[Visualizar os lembretes pendentes]
    E --> F[Verificar as informações do cuidado]
    F --> G([Fim])

    D -->|Não| H[Visualizar mensagem de nenhum lembrete pendente]
    H --> G
```

### User Flow — Configurar alertas

**Funcionalidade:** permitir que o usuário configure alertas para ser avisado sobre cuidados relacionados aos seus pets.

**Objetivo do usuário:** definir quando deseja receber um alerta para evitar o esquecimento de cuidados importantes.

```mermaid
flowchart TD
    A([Início]) --> B[Acessar o Dashboard]
    B --> C[Selecionar o cuidado desejado]
    C --> D[Acessar a opção de configurar alerta]
    D --> E[Definir quando o alerta deve ser enviado]
    E --> F{Configuração válida?}

    F -->|Não| G[Corrigir configuração]
    G --> E

    F -->|Sim| H[Confirmar configuração]
    H --> I[Alerta configurado com sucesso]
    I --> J([Fim])
```
