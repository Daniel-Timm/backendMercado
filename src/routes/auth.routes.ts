import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { autenticar } from '../middlewares/auth.middleware';

const authRoutes = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Registro de clientes e login com geração de token JWT
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Cria uma nova conta de cliente
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Daniel Timm
 *               email:
 *                 type: string
 *                 example: daniel@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               telefone:
 *                 type: string
 *                 example: "53999999999"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro de validação ou e-mail já cadastrado.
 */
authRoutes.post('/auth/registrar', (req, res) => authController.registrar(req, res));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica o usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: daniel@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso (retorna token e dados do usuário).
 *       401:
 *         description: E-mail ou senha inválidos.
 */
authRoutes.post('/auth/login', (req, res) => authController.login(req, res));

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil retornados com sucesso.
 *       401:
 *         description: Token ausente, inválido ou expirado.
 */
authRoutes.get('/auth/perfil', autenticar, (req, res) => authController.perfil(req, res));

export default authRoutes;