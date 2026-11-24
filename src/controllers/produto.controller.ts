import { Request, Response } from 'express';
import { ProdutoService } from '../services/produto.service';

export class ProdutoController {
  private produtoService: ProdutoService;

  constructor() {
    this.produtoService = new ProdutoService();
  }

  async listar(req: Request, res: Response) {
    try {
      const produtos = await this.produtoService.listarProdutos();
      return res.status(200).json(produtos);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await this.produtoService.buscarPorId(id as string);
      return res.status(200).json(produto);
    } catch (error: any) {
      const status = error.message.includes('não encontrado') ? 404 : 400;
      return res.status(status).json({ erro: error.message });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const novoProduto = await this.produtoService.criarProduto(req.body);
      return res.status(201).json(novoProduto);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produtoAtualizado = await this.produtoService.atualizarProduto(id as string, req.body);
      return res.status(200).json(produtoAtualizado);
    } catch (error: any) {
      const status = error.message.includes('não encontrado') ? 404 : 400;
      return res.status(status).json({ erro: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.produtoService.deletarProduto(id as string);
      return res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
    } catch (error: any) {
      const status = error.message.includes('não encontrado') ? 404 : 400;
      return res.status(status).json({ erro: error.message });
    }
  }
}