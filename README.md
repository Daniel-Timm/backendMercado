# backendMercado

API RESTful de back-end para uma plataforma de e-commerce de supermercado, desenvolvida em camadas (`Routes`, `Controllers`, `Services`, `Repositories` e `DTOs`) com foco em organização, tipagem estática e segurança.

> **Integração Full-Stack:** Esta API já está integrada e em funcionamento junto ao front-end desenvolvido em React no repositório [CloneDeMercado](https://github.com/Daniel-Timm/CloneDeMercado).

---

## Tecnologias Utilizadas

- **Runtime & Linguagem:** Node.js, TypeScript
- **Framework Web:** Express
- **Banco de Dados & ORM:** PostgreSQL, Prisma ORM
- **Segurança & Autenticação:** JSON Web Token (JWT), BCrypt
- **Documentação:** Swagger UI (`swagger-jsdoc` / `swagger-ui-express`)

---

## Funcionalidades Implementadas

- **Autenticação e Controle de Acesso (`/auth`):**
  - Cadastro de usuários com hash de senha (`BCrypt`).
  - Login com emissão de token JWT e controle de permissões por perfil (`CLIENTE` e `ADMIN`).
- **Catálogo Público:**
  - Listagem e busca de produtos, categorias, coleções promocionais e banners ativos da página inicial.
- **Gestão Administrativa (Rotas Protegidas):**
  - Criação, edição e remoção de produtos, categorias, banners e coleções (incluindo vínculo de produtos às coleções) restritas a administradores via middleware de autenticação.
- **Documentação Interativa:**
  - Especificação completa das rotas e testes diretos pelo navegador via Swagger UI.

---

## Estrutura do Projeto

```text
backendMercado/
├── prisma/
│   ├── migrations/        # Histórico de migrations do banco de dados
│   └── schema.prisma      # Modelagem das entidades e relacionamentos
├── src/
│   ├── @types/            # Extensões de tipagem (Express Request)
│   ├── config/            # Configuração do Prisma Client e Swagger
│   ├── controllers/       # Recebimento de requisições e respostas HTTP
│   ├── dtos/              # Objetos de transferência e validação de dados
│   ├── middlewares/       # Autenticação JWT e autorização de perfil (ADMIN)
│   ├── repositories/      # Camada de acesso aos dados via Prisma
│   ├── routes/            # Definição de rotas e anotações Swagger
│   ├── services/          # Regras de negócio da aplicação
│   └── index.ts           # Ponto de entrada e configuração do servidor
├── .env.exemple           # Modelo de variáveis de ambiente
├── package.json
└── tsconfig.json
