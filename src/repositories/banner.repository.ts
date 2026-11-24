
import prisma from "../config/database";

export class BannerRepository 
{
   async listarAtivos()
   {
     return await prisma.banner.findMany({
        where: {ativo : true},
        orderBy: {ordem : 'asc'}
     })
   }
   

   async buscarPorId (id : string)
   {  
      return await prisma.banner.findUnique({
        where: {id : id}
      })

   }

   async criar(dados : {
    titulo : string,
    imagemUrl : string,
    linkUrl? : string,
    ordem? : number,
    ativo? : boolean,
    inicioEm? : Date,
    fimEm? : Date

   })
   {
     return await prisma.banner.create({
        data : dados,
     });
   }


   async deletar (id : string)
   {
    return await prisma.banner.delete({
        where: {id : id}
    })
   }

 async atualizar(id: string, dados: {
        titulo?: string;
        imagemUrl?: string;
        linkUrl?: string;
        ordem?: number;
        ativo?: boolean;
        inicioEm?: Date;
        fimEm?: Date;
    }) {
        return await prisma.banner.update({
            where: { id },
            data: dados,
        });
    }
}
