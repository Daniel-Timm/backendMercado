import { Router } from 'express';
import { ProdutoController } from '../controllers/produto.controller';
import { autenticar, autorizarAdmin } from '../middlewares/auth.middleware';

const produtoRoutes = Router();
const produtoController = new ProdutoController();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos do e-commerce
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos cadastrados
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
produtoRoutes.get('/produtos', (req, res) => produtoController.listar(req, res));

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto específico pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) do produto
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
produtoRoutes.get('/produtos/:id', (req, res) => produtoController.buscarPorId(req, res));

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Produtos]
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
 *               - preco
 *               - categoriaId
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Café Melitta 500g
 *               descricao:
 *                 type: string
 *                 example: Café torrado e moído tradicional
 *               codigoBarras:
 *                 type: string
 *                 example: "7891000100102"
 *               imagemUrl:
 *                 type: string
 *                 example: https://exemplo.com/cafe.png
 *               preco:
 *                 type: number
 *                 example: 18.90
 *               precoOriginal:
 *                 type: number
 *                 example: 21.90
 *               estoque:
 *                 type: number
 *                 example: 50
 *               categoriaId:
 *                 type: string
 *                 format: uuid
 *                 example: 9c8ffdd5-8c64-4a80-87ae-303fc3d68eff
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso.
 *       400:
 *         description: Erro de validação (campos obrigatórios ausentes ou inválidos).
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 *       500:
 *         description: Erro interno do servidor.
 */
produtoRoutes.post('/produtos', autenticar, autorizarAdmin, (req, res) => produtoController.criar(req, res));


/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
produtoRoutes.put('/produtos/:id', autenticar, autorizarAdmin, (req, res) =>
  produtoController.atualizar(req, res)
);

produtoRoutes.delete('/produtos/:id', autenticar, autorizarAdmin, (req, res) =>
  produtoController.deletar(req, res)
);


export default produtoRoutes;