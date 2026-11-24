import { ColecaoRepository } from "../repositories/colecao.repository";
import { ProdutoRepository } from "../repositories/produto.repository";


export class ColecaoService {
    private colecaoRepository : ColecaoRepository;
    private produtoRepository : ProdutoRepository;


    constructor (){
        this.colecaoRepository = new ColecaoRepository();
        this.produtoRepository = new ProdutoRepository();
    }


    async listarColecoes ()
    {
        return await this.colecaoRepository.listarTodas();
    }


    async buscarPorId (id : string)
    {
       if(!id)
       {
        throw new Error ('Coleção não encontrada')
       }
       const colecao = await this.colecaoRepository.buscarPorId(id)
       if(!colecao)
       {
        throw new Error('Coleção inexistente.')
       }

       return  colecao;
    }


    async criarColecao (dados: {
        nome:string;
        ordem? : number;
        ativa? : boolean;
        inicioEm? : Date;
        fimEm? : Date;
    })
    {
        if(!dados.nome || dados.nome.trim() === '')
        {
            throw new Error ('o nome da coleção é obrigatoria.')
        }
        

        const slug = dados.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
      

      return await this.colecaoRepository.criar({
        nome : dados.nome,
        slug, 
        ordem : dados.ordem,
        ativa : dados.ativa,
        inicioEm : dados.inicioEm,
        fimEm : dados.fimEm,
      })
    }

    async adicionarProduto (colecaoId : string , produtoId : string, ordem? : number)
    {
        const produtoExistente = await this.produtoRepository.buscarPorId(produtoId);
        const colecaoExistente = await this.colecaoRepository.buscarPorId(colecaoId);

        if(!produtoExistente)
        {
            throw new Error ('Produto não exitente');
        }
        if(!colecaoExistente)
        {
            throw new Error('Coleção não existente')
        }

        return await this.colecaoRepository.adicionarProduto(colecaoId, produtoId, ordem)


    } 

    async removerProduto (colecaoId : string , produtoId : string  )
    {
        const produtoExistente = await this.produtoRepository.buscarPorId(produtoId);
        const colecaoExistente = await this.colecaoRepository.buscarPorId(colecaoId);

        if(!produtoExistente || !colecaoExistente)
        {
         throw new Error ('Produto ou coleção não existentes.')
        }

        return await this.colecaoRepository.removerProduto(colecaoId, produtoId);
    }


}