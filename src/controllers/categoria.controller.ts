import { Request, Response } from 'express';
import { CategoriaService } from '../services/categoria.service';

export class CategoriaController {
  private categoriaService: CategoriaService;

  constructor() {
    this.categoriaService = new CategoriaService();
  }

//equivalente ao GET

  async listar(req: Request, res: Response) 
  {
    try {
      const categorias = await this.categoriaService.listarCategorias();
      return res.status(200).json(categorias);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message || 'Erro interno do servidor.' });
    }
  }



//agr POST
  async criar(req: Request, res: Response) 
  {
    try {
      const { nome, icone, ordem } = req.body;

      const novaCategoria = await this.categoriaService.criarCategoria({
        nome,
        icone,
        ordem: ordem ? Number(ordem) : undefined,
      });

      return res.status(201).json(novaCategoria);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}