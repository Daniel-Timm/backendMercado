import { ProdutoRepository } from '../repositories/produto.repository';

export class ProdutoService {
    private produtoRepository : ProdutoRepository;

    constructor()
    {
      this.produtoRepository = new ProdutoRepository();
    }



    async listarProdutos()
    {
      return await this.produtoRepository.listarTodos();
    }


    async criarProduto(dados: 
  {
    nome: string;
    
    descricao?: string;
    codigoBarras?: string;
    imagemUrl?: string;
    preco: number;
    precoOriginal?: number;
    estoque: number;
    categoriaId: string;
  })
  {
    if (!dados.nome || dados.nome.trim() === '')
    {
      throw new Error ('o nome do produto é obrigatorio. ')
    }
    else if(!dados.preco || dados.preco <= 0 )
    {
       throw new Error('O preço está incorreto ou não foi digitado.')
    }
    else if(!dados.categoriaId)
    {
      throw new Error('A categoria do produto deve ser informada.')
    }

    const slug = dados.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');


    return await this.produtoRepository.criar({
      nome: dados.nome,
      slug,
      descricao: dados.descricao,
      codigoBarras: dados.codigoBarras,
      imagemUrl : dados.imagemUrl,
      preco : dados.preco,
      estoque : dados.estoque,
      categoriaId : dados.categoriaId,

    })
  }

  async buscarPorId (id: string )
  {

    if(!id){
      throw new Error('Produto inexistente')
    }

    const produto = await this.produtoRepository.buscarPorId(id)

    if (!produto)
    {
      throw new Error('Produto não encontrado')
    }
    return await this.produtoRepository.buscarPorId(id);
  }
}
  