import { CategoriaRepository } from "../repositories/categoria.repository";


export class CategoriaService {
    private categoriaRepository : CategoriaRepository;

    constructor() {
        this.categoriaRepository = new CategoriaRepository();
    }

    async listarCategorias()
    {
        return await this.categoriaRepository.listarTodas();
    }


    async criarCategoria(dados: { nome: string; icone? : string; ordem? : number}) 
    {
        if(!dados.nome || dados.nome.trim() === '')
        {
            throw new Error('o nome da categoria é obrigatorio. ')
        }

        // apenas um modificador de nome gerado por IA
        const slug = dados.nome
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') 
          .replace(/[^a-z0-9]/g, '-')    
          .replace(/-+/g, '-')            
          .replace(/^-|-$/g, '');         

       return await this.categoriaRepository.criar({
        nome: dados.nome,
        slug,
        icone: dados.icone,
        ordem: dados.ordem ?? 0 ,
       })  ;
    }

    async deletar(id: string) {
  const existe = await this.categoriaRepository.buscarPorId(id);
  if (!existe) {
    throw new Error('Categoria não encontrada');
  }

  try {
    return await this.categoriaRepository.deletar(id);
  } catch (error: any) {
    if (error.code === 'P2003') {
      throw new Error('Não é possível excluir uma categoria que possui produtos vinculados.');
    }
    throw error;
  }
}



    
}