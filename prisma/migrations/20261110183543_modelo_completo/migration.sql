/*
  Warnings:

  - You are about to drop the column `categoria` on the `produtos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `produtos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoBarras]` on the table `produtos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoriaId` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('CLIENTE', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('PENDENTE', 'CONFIRMADO', 'EM_SEPARACAO', 'EM_ENTREGA', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'DINHEIRO');

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "categoria",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "categoriaId" TEXT NOT NULL,
ADD COLUMN     "codigoBarras" TEXT,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "imagemUrl" TEXT,
ADD COLUMN     "precoOriginal" DECIMAL(10,2),
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "telefone" TEXT,
    "papel" "Papel" NOT NULL DEFAULT 'CLIENTE',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" CHAR(2) NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icone" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "paiId" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colecoes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "inicioEm" TIMESTAMP(3),
    "fimEm" TIMESTAMP(3),

    CONSTRAINT "colecoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos_colecoes" (
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "colecaoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "produtos_colecoes_pkey" PRIMARY KEY ("colecaoId","produtoId")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "inicioEm" TIMESTAMP(3),
    "fimEm" TIMESTAMP(3),

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrinhos" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "carrinhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_carrinho" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "carrinhoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "itens_carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL,
    "numero" SERIAL NOT NULL,
    "status" "StatusPedido" NOT NULL DEFAULT 'PENDENTE',
    "formaPagamento" "FormaPagamento" NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "taxaEntrega" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,
    "enderecoEntrega" JSONB NOT NULL,
    "observacao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_pedido" (
    "id" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "precoUnitario" DECIMAL(10,2) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "itens_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listas_compras" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "listas_compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_lista_compras" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "listaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "itens_lista_compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contatos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "respondido" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT,

    CONSTRAINT "contatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "enderecos_usuarioId_idx" ON "enderecos"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "categorias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "colecoes_slug_key" ON "colecoes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "carrinhos_usuarioId_key" ON "carrinhos"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "itens_carrinho_carrinhoId_produtoId_key" ON "itens_carrinho"("carrinhoId", "produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_numero_key" ON "pedidos"("numero");

-- CreateIndex
CREATE INDEX "pedidos_usuarioId_idx" ON "pedidos"("usuarioId");

-- CreateIndex
CREATE INDEX "listas_compras_usuarioId_idx" ON "listas_compras"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "itens_lista_compras_listaId_produtoId_key" ON "itens_lista_compras"("listaId", "produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_slug_key" ON "produtos"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_codigoBarras_key" ON "produtos"("codigoBarras");

-- CreateIndex
CREATE INDEX "produtos_categoriaId_idx" ON "produtos"("categoriaId");

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_paiId_fkey" FOREIGN KEY ("paiId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_colecoes" ADD CONSTRAINT "produtos_colecoes_colecaoId_fkey" FOREIGN KEY ("colecaoId") REFERENCES "colecoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_colecoes" ADD CONSTRAINT "produtos_colecoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinhos" ADD CONSTRAINT "carrinhos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_carrinho" ADD CONSTRAINT "itens_carrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "carrinhos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_carrinho" ADD CONSTRAINT "itens_carrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listas_compras" ADD CONSTRAINT "listas_compras_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_lista_compras" ADD CONSTRAINT "itens_lista_compras_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "listas_compras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_lista_compras" ADD CONSTRAINT "itens_lista_compras_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatos" ADD CONSTRAINT "contatos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
