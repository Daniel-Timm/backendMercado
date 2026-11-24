import { BannerRepository } from "../repositories/banner.repository";

export class BannerService {
    private bannerRepository: BannerRepository;

    constructor() {
        this.bannerRepository = new BannerRepository();
    }

    async listarAtivos() {
        return await this.bannerRepository.listarAtivos();
    }

    async buscarPorId(id: string) {
        const bannerEncontrado = await this.bannerRepository.buscarPorId(id);

        if (!bannerEncontrado) {
            throw new Error('Banner não encontrado.');
        }
        return bannerEncontrado;
    }

    async criar(dados: {
        titulo: string;
        imagemUrl: string;
        linkUrl?: string;
        ordem?: number;
        ativo?: boolean;
        inicioEm?: Date;
        fimEm?: Date;
    }) {
        if (!dados.titulo || dados.titulo.trim() === '') {
            throw new Error('O título do banner está vazio ou incorreto.');
        }
        if (!dados.imagemUrl || dados.imagemUrl.trim() === '') {
            throw new Error('A URL da imagem está vazia ou incorreta.');
        }

        return await this.bannerRepository.criar(dados);
    }

    async atualizar(id: string, dados: {
        titulo?: string;
        imagemUrl?: string;
        linkUrl?: string;
        ordem?: number;
        ativo?: boolean;
        inicioEm?: Date;
        fimEm?: Date;
    }) {
        await this.buscarPorId(id);
        return await this.bannerRepository.atualizar(id, dados);
    }

    async deletar(id: string) {
        await this.buscarPorId(id);
        return await this.bannerRepository.deletar(id);
    }
}