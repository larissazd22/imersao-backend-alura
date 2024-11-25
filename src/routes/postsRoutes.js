// Importa o framework Express para construir aplicações web
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções controladoras do arquivo postsController.js
// Essas funções provavelmente se encarregam de buscar, criar e processar posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para o Multer
// - Define o diretório de destino para arquivos enviados (`./uploads/`)
// - Mantém o nome original do arquivo enviado
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer usando a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Redundante, já definido em storage

// Define uma função para configurar rotas na aplicação Express
const routes = (app) => {
  // Configura o middleware para interpretar dados JSON em requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para buscar uma lista de todos os posts (tratada por listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada por postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem usando o middleware Multer e depois processada por uploadImagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost )
};

// Exporta a função routes para uso em outros arquivos da aplicação
export default routes;