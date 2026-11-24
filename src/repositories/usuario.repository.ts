import prisma from "../config/database";

export class UsuarioRepository
{
    async buscarPorEmail (email : string)
    {
        return await prisma.usuario.findUnique({
            where : {email},
        })
    }

    async buscarPorId (id : string)
    {
        return await prisma.usuario.findUnique
        ({
            where : {id},
            select : {id: true, nome: true, email: true,
                cpf: true, telefone : true,
                papel : true, criadoEm: true,
            }
        });
    }

    async criar (dados : {
        nome: string; email: string;
        senhaHash: string; cpf? : string;
        telefone? : string;
    })
    {
        return await prisma.usuario.create
        ({
            data : dados,
           
            select : {id: true, nome: true, email: true,
             cpf: true, telefone : true,
             papel : true, criadoEm: true,},
        });
    }

    async atualizar (id : string , dados : {
        nome?: string; email?: string;
        senhaHash?: string; cpf? : string;
        telefone? : string;
    })
    {
         return await prisma.usuario.update
        ({
            
            where : {id},
            data : dados,

            select : {id: true, nome: true, email: true,
            cpf: true, telefone : true,
            papel : true, criadoEm: true,},
        });
    }

    async deletarUsuario (id : string)
    {
        return await prisma.usuario.delete
        ({
            where : {id},
        });
    }
}