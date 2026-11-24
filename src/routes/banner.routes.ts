import { Router } from 'express';
import { BannerController } from '../controllers/banner.controller';
import { autenticar, autorizarAdmin } from '../middlewares/auth.middleware';

const bannerRoutes = Router();
const bannerController = new BannerController();

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Gerenciamento de banners promocionais da página inicial
 */

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Lista todos os banners ativos ordenados
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: Lista de banners retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
bannerRoutes.get('/banners', (req, res) => bannerController.listar(req, res));

/**
 * @swagger
 * /banners/{id}:
 *   get:
 *     summary: Busca um banner específico pelo ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) do banner
 *     responses:
 *       200:
 *         description: Banner encontrado com sucesso.
 *       404:
 *         description: Banner não encontrado.
 */
bannerRoutes.get('/banners/:id', (req, res) => bannerController.buscarPorId(req, res));

/**
 * @swagger
 * /banners:
 *   post:
 *     summary: Cadastra um novo banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - imagemUrl
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Festival de Carnes Treichel
 *               imagemUrl:
 *                 type: string
 *                 example: https://meusite.com/banners/carnes.jpg
 *               linkUrl:
 *                 type: string
 *                 example: /colecoes/ofertas-da-semana
 *               ordem:
 *                 type: number
 *                 example: 1
 *               ativo:
 *                 type: boolean
 *                 example: true
 *               inicioEm:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-17T00:00:00.000Z"
 *               fimEm:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-24T23:59:59.000Z"
 *     responses:
 *       201:
 *         description: Banner criado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 */
bannerRoutes.post('/banners', autenticar, autorizarAdmin, (req, res) => bannerController.criar(req, res));

/**
 * @swagger
 * /banners/{id}:
 *   put:
 *     summary: Atualiza os dados de um banner existente
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) do banner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               imagemUrl:
 *                 type: string
 *               linkUrl:
 *                 type: string
 *               ordem:
 *                 type: number
 *               ativo:
 *                 type: boolean
 *               inicioEm:
 *                 type: string
 *                 format: date-time
 *               fimEm:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Banner atualizado com sucesso.
 *       404:
 *         description: Banner não encontrado.
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 */
bannerRoutes.put('/banners/:id', autenticar, autorizarAdmin, (req, res) => bannerController.atualizar(req, res));

/**
 * @swagger
 * /banners/{id}:
 *   delete:
 *     summary: Remove um banner pelo ID
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único (UUID) do banner
 *     responses:
 *       200:
 *         description: Banner deletado com sucesso.
 *       404:
 *         description: Banner não encontrado.
 *       401:
 *         description: Token ausente ou inválido.
 *       403:
 *         description: Acesso negado (requer papel ADMIN).
 */
bannerRoutes.delete('/banners/:id', autenticar, autorizarAdmin, (req, res) => bannerController.deletar(req, res));

export default bannerRoutes;