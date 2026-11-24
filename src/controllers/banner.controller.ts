import { Request, Response } from 'express';
import { BannerService } from '../services/banner.service';

export class BannerController {
    private bannerService : BannerService;

    constructor ()
    {
        this.bannerService = new BannerService();
    }


    async listar (req : Request, res : Response)
    {
        try 
        {
            const banners = await this.bannerService.listarAtivos();
            return res.status(200).json(banners);
        }
        catch(error : any)
        {
            return res.status(500).json({
                erro : error.message || 'Erro interno do servidor.'
            });
        }
    }

    async buscarPorId (req : Request, res : Response)
    {
        try
        {
            const {id} = req.params;
            const bannerLocalizado = await this.bannerService.buscarPorId(id as string);

            return res.status(200).json(bannerLocalizado);
        }
        catch(error : any)
        {
            return res.status(404).json({erro : error.message})
        }
    }

    async criar (req : Request, res : Response)
    {
        try
        {
            const 
            {
               titulo,ordem,ativo,imagemUrl,linkUrl,inicioEm,fimEm,
            } = req.body

            const novoBanner = await this.bannerService.criar({
                titulo,
                ordem : ordem !== undefined ? Number(ordem) : undefined,
                ativo : ativo !== undefined ? Boolean(ativo) : undefined,
                imagemUrl ,
                linkUrl,
                inicioEm : inicioEm ? new Date (inicioEm) : undefined,
                fimEm : fimEm ? new Date (fimEm) : undefined,

            });
            return res.status(201).json(novoBanner);
        }
        catch (error : any)
        {
            return res.status(400).json({erro : error.message});
        }
    }

    async atualizar (req : Request, res : Response)
    {
        try
        {
            const {id} = req.params;
            const {titulo, ordem,ativo,imagemUrl,linkUrl,inicioEm,fimEm} = req.body;

            const bannerAtualizado = await this.bannerService.atualizar( id as string,{
                titulo,
                ordem : ordem !== undefined ? Number(ordem) : undefined,
                ativo : ativo !== undefined ? Boolean(ativo) : undefined,
                imagemUrl ,
                linkUrl,
                inicioEm : inicioEm ? new Date (inicioEm) : undefined,
                fimEm : fimEm ? new Date (fimEm) : undefined,

            });
            return res.status(200).json(bannerAtualizado);
        }
        catch(error : any )
        {
            const status = error.message.includes('não encontrado') ? 404 : 400;
            return res.status(status).json({erro : error.message})
        }
    }


    async deletar(req : Request, res :Response)
    {
        try
        {
            const {id} = req.params;

            await this.bannerService.deletar(id as string);
            return res.status(200).json({mensagem : 'Banner deletado com sucesso!'});
            
        }
        catch (error : any)
        {
            return res.status(404).json({erro : error.message})
        }
    }
}