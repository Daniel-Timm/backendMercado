import prisma from '../config/database';


export class ColecaoRepository {
  
    async listarTodas(){
        return await prisma.colecao.findMany({
            where : {ativa : true},
            orderBy : {
                inicioEm:   'desc',

                
            },
            include : {
                produtos: {
                    include: {
                        produto : true,
                    }
                }
            }
                
            
        });
    }

    async buscarPorId (id : string)
    {
        return await prisma.colecao.findUnique({
            where : {id},
            include : {
                produtos: {
                    include: {
                        produto : true,
                    }
                }
            }
        });
    }

    async criar (dados :  {slug: string ; nome : string; ordem? : number; ativa? : boolean; inicioEm? : Date; fimEm? :  Date ;})
    {
        return await prisma.colecao.create({
            data : dados,
        })
    }

    async adicionarProduto (colecaoId : string, produtoId : string, ordem? : number)
    {
        return await prisma.produtoColecao.create({data : {colecaoId ,produtoId, ordem,}});

    }

    async removerProduto  (colecaoId : string, produtoId: string)
    {
        return await prisma.produtoColecao.delete({
            where: {colecaoId_produtoId : {colecaoId , produtoId }}
        })
    }


}