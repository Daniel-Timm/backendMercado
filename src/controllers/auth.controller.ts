import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registrarUsuarioSchema, loginSchema } from '../dtos/auth.dto';
import { UsuarioRepository } from '../repositories/usuario.repository';
import ne from 'zod/v4/locales/ne.js';

export class AuthController 
{
    private authService :  AuthService;

    constructor() {
        this.authService = new AuthService();
    }


    async registrar(req: Request, res: Response) {
        try 
        {
            const validacao = registrarUsuarioSchema.safeParse(req.body);

            if (!validacao.success) 
            {
                return res.status(400).json({
                    erro: 'Dados inválidos.',
                    detalhes: validacao.error.issues.map(issue => issue.message),
                });
            }

            const novoUsuario = await this.authService.registrar(validacao.data);

            return res.status(201).json(novoUsuario);
        } 
        catch (error: any) 
        {
            return res.status(400).json({ erro: error.message });
        }
    }

    async login (req: Request, res:Response)
    {
        try
        {
            const validacao = loginSchema.safeParse(req.body);
    
            if (!validacao.success)
            {
                return res.status(400).json({
                    erro : 'Dados inválidos.',
                    detalhes: validacao.error.issues.map(issue => issue.message),
                });
            }
            const resultado = await this.authService.login
            (   validacao.data.email, 
                validacao.data.senha
            );
            return res.status(200).json(resultado);

        }
        catch (error : any)
        {
            return  res.status(401).json({erro: error.message})
        }


    }


    async perfil (req: Request, res: Response)
    {
      try
      {
          
           const usuarioId = req.usuario!.id;
   
           const usuarioRepository= new UsuarioRepository();
           const usuario = await usuarioRepository.buscarPorId(usuarioId);
   
           if(!usuario)
           {
               return res.status(404).json({erro: 'Usuario não encontrado'})
   
           }
           return res.status(200).json(usuario);

      } 

    catch (error : any)
        {
          return res.status(500).json({erro: error.massage});
        }
       
    }

}