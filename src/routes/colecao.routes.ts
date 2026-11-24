import { Router } from 'express';
import { ColecaoController } from '../controllers/colecao.controller';
import { autenticar, autorizarAdmin } from '../middlewares/auth.middleware';

const colecaoRoutes = Router();
const colecaoController = new ColecaoController();

/**
 * @swagger
 * tags:
 *   name: Coleções
 *   description: Gerenciamento de coleções e vitrines de produtos (ex. Ofertas da Semana)
 */

/**
 * @swagger
 * /colecoes:
 *   get:
 *     summary: Lista todas as coleções ativas com seus produtos vinculados
 *     tags: [Coleções]
 *     responses:
 *       200:
 *         description: Lista de coleções retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
colecaoRoutes.get('/colecoes', (req, res) => colecaoController.listar(req, res));

/**
 * @swagger
 * /colecoes/{id}:
 *   get:
 *     summary: Busca uma coleção específica pelo ID (incluindo os produtos)
 *     tags: [Coleções]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) da coleção
 *     responses:
 *       200:
 *         description: Coleção encontrada com sucesso.
 *       404:
 *         description: Coleção não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
colecaoRoutes.get('/colecoes/:id', (req, res) => colecaoController.buscarPorId(req, res));

/**
 * @swagger
 * /colecoes:
 *   post:
 *     summary: Cadastra uma nova coleção
 *     tags: [Coleções]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ofertas da Semana
 *               ordem:
 *                 type: number
 *                 example: 1
 *               ativa:
 *                 type: boolean
 *                 example: true
 *               inicioEm:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-16T00:00:00.000Z"
 *               fimEm:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-23T23:59:59.000Z"
 *     responses:
 *       201:
 *         description: Coleção cadastrada com sucesso.
 *       400:
 *         description: Erro de validação (nome ausente ou dados inválidos).
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 *       500:
 *         description: Erro interno do servidor.
 */
colecaoRoutes.post('/colecoes', autenticar, autorizarAdmin, (req, res) => colecaoController.criar(req, res));

/**
 * @swagger
 * /colecoes/{colecaoId}/produtos:
 *   post:
 *     summary: Adiciona um produto a uma coleção existente
 *     tags: [Coleções]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colecaoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) da coleção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *             properties:
 *               produtoId:
 *                 type: string
 *                 example: "uuid-do-produto-aqui"
 *               ordem:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto vinculado à coleção com sucesso.
 *       400:
 *         description: Produto ou coleção inexistente, ou produto já vinculado.
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 */
colecaoRoutes.post('/colecoes/:colecaoId/produtos', autenticar, autorizarAdmin, (req, res) =>
    colecaoController.adicionarProduto(req, res)
);

/**
 * @swagger
 * /colecoes/{colecaoId}/produtos/{produtoId}:
 *   delete:
 *     summary: Remove um produto de uma coleção
 *     tags: [Coleções]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: colecaoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) da coleção
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) do produto
 *     responses:
 *       200:
 *         description: Produto removido da coleção com sucesso.
 *       400:
 *         description: Erro ao remover produto ou registro inexistente.
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 */
colecaoRoutes.delete('/colecoes/:colecaoId/produtos/:produtoId', autenticar, autorizarAdmin, (req, res) =>
    colecaoController.removerProduto(req, res)
);

export default colecaoRoutes;