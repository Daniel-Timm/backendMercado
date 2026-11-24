import prisma from '../config/database';

export class ProdutoRepository {
  async listarTodos() {
    return await prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async buscarPorId(id: string) {
    return await prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
      },
    });
  }

  async criar(dados: {
    nome: string;
    slug: string;
    descricao?: string;
    codigoBarras?: string;
    imagemUrl?: string;
    preco: number;
    precoOriginal?: number | null;
    estoque: number;
    categoriaId: string;
  }) {
    return await prisma.produto.create({
      data: dados,
    });
  }

  async atualizar(
    id: string,
    dados: Partial<{
      nome: string;
      slug: string;
      descricao: string | null;
      codigoBarras: string | null;
      imagemUrl: string | null;
      preco: number;
      precoOriginal: number | null;
      estoque: number;
      categoriaId: string;
    }>
  ) {
    return await prisma.produto.update({
      where: { id },
      data: dados,
    });
  }

  async deletar(id: string) {
    return await prisma.produto.delete({
      where: { id },
    });
  }
}