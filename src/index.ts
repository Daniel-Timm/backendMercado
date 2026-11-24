
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bannerRoutes from './routes/banner.routes';
import categoriaRoutes from './routes/categoria.routes';
import produtoRoutes from './routes/produto.routes';
import colecaoRoutes from './routes/colecao.routes';
import authRoutes from './routes/auth.routes';
import { setupSwagger } from './config/swagger';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(categoriaRoutes);
app.use(produtoRoutes);
app.use(colecaoRoutes);
app.use(bannerRoutes);
app.use(authRoutes);


setupSwagger(app);

app.get('/', (req, res) => {
  res.json({ message: 'API do Meu Mercado rodando com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});