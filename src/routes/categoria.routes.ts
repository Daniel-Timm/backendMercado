import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller';
import { autenticar, autorizarAdmin } from '../middlewares/auth.middleware';

const categoriaRoutes = Router();
const categoriaController = new CategoriaController();

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Retorna a lista de todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso.
 */
categoriaRoutes.get('/categorias', (req, res) => categoriaController.listar(req, res));

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cadastra uma nova categoria
 *     tags: [Categorias]
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
 *                 example: Hortifrute
 *               icone:
 *                 type: string
 *                 example: apple
 *               ordem:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 */
categoriaRoutes.post('/categorias', autenticar, autorizarAdmin, (req, res) => categoriaController.criar(req, res));



/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria pelo ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) da categoria
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso.
 *       400:
 *         description: Categoria possui produtos vinculados ou requisição inválida.
 *       404:
 *         description: Categoria não encontrada.
 */
categoriaRoutes.delete('/categorias/:id', autenticar, autorizarAdmin, (req, res) =>
  categoriaController.deletar(req, res)
);

export default categoriaRoutes;