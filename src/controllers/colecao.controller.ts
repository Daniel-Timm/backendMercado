import { Request, Response } from 'express';
import { ColecaoService } from '../services/colecao.service';



export class ColecaoController {
    private colecaoService : ColecaoService;

    constructor (){
        this.colecaoService = new ColecaoService();
    }


    async listar (req : Request, res : Response)
    {
        try 
        {
            const colecoes = await this.colecaoService.listarColecoes();
            return res.status(200).json(colecoes);
        }
        catch (error : any)
        {
            return res.status(500).json({erro : error.message || 'Erro interno do servidor.'})
        }
    }

    async buscarPorId (req : Request, res : Response)
    {
        try
        {
            const {id} = req.params; 
            const colecaoLocalizada = await this.colecaoService.buscarPorId(id as string);
            

            return res.status(200).json(colecaoLocalizada)
        }
        catch(error : any)
        {
            const status = error.message.includes('não encontrada') || error.message.includes ('inexistente')
            ? 404 : 400;
            return res.status(status).json({erro : error.message})
        }
    }


    async criar (req : Request, res : Response)
    {
        try 
        {
            const {nome , ordem, ativa, inicioEm, fimEm} = req.body;

            const novaColecao = await this.colecaoService.criarColecao({

                nome,
                ordem : ordem !== undefined ? Number(ordem) : undefined,
                ativa : ativa !== undefined ? Boolean(ativa) : undefined,
                inicioEm : inicioEm ?  new Date (inicioEm) : undefined,
                fimEm : fimEm ? new Date (fimEm) : undefined,
            });
            return res.status(201).json(novaColecao);

        }
        catch (error : any )
        {
           return res.status(400).json({erro:  error.message})
        }
    }

    async adicionarProduto(req : Request, res : Response)
    {
        try
        {
            const {colecaoId} = req.params;
            const {produtoId, ordem} = req.body;

            const NovoProdutoAdicionado = await this.colecaoService.adicionarProduto(colecaoId as string , produtoId, ordem !== undefined ? Number(ordem) : undefined);
            return res.status(201).json(NovoProdutoAdicionado)
        }
        catch(error : any)
        {
            return res.status(400).json({erro : error.message})
        }

        
    }

    async removerProduto (req : Request, res : Response)
    {
        try
        {
            const {colecaoId, produtoId } = req.params;
            const produtoAdd = await this.colecaoService.removerProduto(colecaoId as string, produtoId as string)
            return res.status(200).json({mensagem: 'Produto removido da coleção com sucesso.'})
        
        }
        catch(error : any)
        {
            return res.status(400).json({erro : error.message})
        }
    }

}