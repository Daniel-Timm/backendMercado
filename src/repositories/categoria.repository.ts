import prisma from "../config/database";

export class CategoriaRepository {

  async listarTodas()
  {
    return await prisma.categoria.findMany({
      where: {ativa : true},
      orderBy: { ordem: 'asc'},
    });
  }
  



  async buscarPorId (id : string )
  {
    return await prisma.categoria.findUnique({
      where : {id},
    });
  }


 
  async criar(dados: { nome: string; slug: string; icone?: string; ordem? : number})
  {
    return await prisma.categoria.create({
        data : dados,
    });
  }

}

