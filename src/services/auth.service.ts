import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/usuario.repository';

export class AuthService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async registrar(dados: {
        nome: string;
        email: string;
        senha: string;
        cpf?: string;
        telefone?: string;
    }) {
        const usuarioExistente = await this.usuarioRepository.buscarPorEmail(dados.email);

        if (usuarioExistente) {
            throw new Error('Este e-mail já está cadastrado.');
        }

        const senhaHash = await bcrypt.hash(dados.senha, 10);

        return await this.usuarioRepository.criar({
            nome: dados.nome,
            email: dados.email,
            senhaHash,
            cpf: dados.cpf,
            telefone: dados.telefone,
        });
    }

    async login(email: string, senha: string) {
        const usuario = await this.usuarioRepository.buscarPorEmail(email);

        if (!usuario) {
            throw new Error('E-mail ou senha inválidos.');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

        if (!senhaValida) {
            throw new Error('E-mail ou senha inválidos.');
        }

        const token = jwt.sign(
            { id: usuario.id, papel: usuario.papel },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                papel: usuario.papel,
            },
            token,
        };
    }
}