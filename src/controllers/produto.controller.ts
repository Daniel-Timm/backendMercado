import { Request, Response } from 'express';
import { ProdutoService } from '../services/produto.service';

export class ProdutoController {
    private produtoService : ProdutoService;

    constructor()
    {
        this.produtoService = new ProdutoService();
    }

    

    async listar (req : Request, res : Response)
    {
        try {
            const produtos = await this.produtoService.listarProdutos();
            return res.status(200).json(produtos);
        }
        catch(error : any){
            return res.status(500).json({ erro : error.message || 'Erro interno do servidor.'});
        }
    }



    async criar (req: Request, res: Response)
    {
        try
        {
            const {nome, descricao, codigoBarras, imagemUrl,preco,precoOriginal,estoque,categoriaId} 
            = req.body;


            const novoProduto = await this.produtoService.criarProduto({
                nome,
                descricao,
                codigoBarras,
                imagemUrl,
                preco: Number(preco),
                precoOriginal: precoOriginal ? Number(precoOriginal) : undefined,
                estoque : estoque ? Number(estoque) : 0,
                categoriaId,
            });
            return res.status(201).json(novoProduto);

        }catch (error : any) 
        {
            return res.status(400).json({erro: error.message})
        }
    }


    async buscarPorId (req : Request, res: Response)
    {
        try 
        { 
           const {id}  = req.params;
           const produtoLocalizado = await this.produtoService.buscarPorId(id as string);

           return res.status(200).json(produtoLocalizado)
        }
        catch (error : any )
        {
           const status = error.message.includes('não encontrado') || error.message.includes ('inexistente') ? 404 : 400;
           return res.status(status).json({erro : error.message})
        }
    }

}
