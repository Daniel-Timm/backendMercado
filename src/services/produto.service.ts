import { ProdutoRepository } from '../repositories/produto.repository';

export class ProdutoService {
  private produtoRepository: ProdutoRepository;

  constructor() {
    this.produtoRepository = new ProdutoRepository();
  }

  private gerarSlug(nome: string): string {
    return nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async listarProdutos() {
    return await this.produtoRepository.listarTodos();
  }

  async criarProduto(dados: {
    nome: string;
    descricao?: string;
    codigoBarras?: string;
    imagemUrl?: string;
    preco: number;
    precoOriginal?: number | null;
    estoque: number;
    categoriaId: string;
  }) {
    if (!dados.nome || dados.nome.trim() === '') {
      throw new Error('o nome do produto é obrigatorio.');
    } else if (!dados.preco || dados.preco <= 0) {
      throw new Error('O preço está incorreto ou não foi digitado.');
    } else if (!dados.categoriaId) {
      throw new Error('A categoria do produto deve ser informada.');
    }

    const slug = this.gerarSlug(dados.nome);

    return await this.produtoRepository.criar({
      nome: dados.nome,
      slug,
      descricao: dados.descricao,
      codigoBarras: dados.codigoBarras,
      imagemUrl: dados.imagemUrl,
      preco: dados.preco,
      precoOriginal: dados.precoOriginal ?? null,
      estoque: dados.estoque,
      categoriaId: dados.categoriaId,
    });
  }

  async buscarPorId(id: string) {
    if (!id) {
      throw new Error('Produto inexistente');
    }

    const produto = await this.produtoRepository.buscarPorId(id);

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return produto;
  }

  async atualizarProduto(
    id: string,
    dados: Partial<{
      nome: string;
      descricao: string | null;
      codigoBarras: string | null;
      imagemUrl: string | null;
      preco: number;
      precoOriginal: number | null;
      estoque: number;
      categoriaId: string;
    }>
  ) {
    await this.buscarPorId(id);

    if (dados.nome !== undefined && dados.nome.trim() === '') {
      throw new Error('o nome do produto é obrigatorio.');
    }
    if (dados.preco !== undefined && dados.preco <= 0) {
      throw new Error('O preço está incorreto ou não foi digitado.');
    }

    const dadosParaAtualizar: any = { ...dados };

    if (dados.nome) {
      dadosParaAtualizar.slug = this.gerarSlug(dados.nome);
    }

    return await this.produtoRepository.atualizar(id, dadosParaAtualizar);
  }

  async deletarProduto(id: string) {
    await this.buscarPorId(id);

    try {
      return await this.produtoRepository.deletar(id);
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new Error('Não é possível excluir um produto que está vinculado a outros registros.');
      }
      throw error;
    }
  }
}