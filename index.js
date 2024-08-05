// Dependencias
import cors from 'cors';
import express from 'express';

import deletarGestantePorId from './routes/delete.js';
import buscarGestantes from './routes/get.js';
import buscarGestantePorId from './routes/getById.js';
import cadastrarGestante from './routes/post.js';
import atualizarGestantePorId from './routes/put.js';

// Instanciando métodos da dependencia 'express'
const server = express();

// CORS: Garante que aplicações seletas possam consumir a API
server.use(cors({
    // Quais endereços podem consumir a API
    origin: ['http://localhost:3000','https://cadastro-gestantes.vercel.app', 'https://cadastro-gestantes-git-master-marcosmontes-projects.vercel.app', 'https://cadastro-gestantes-raeaf981d-marcosmontes-projects.vercel.app' ], //URL do FrontEnd (Next.js)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}))

// Toda requisição terá seu corpo convertido para JS
server.use(express.json()); 

//Rotas: 
// express usar em (origin + rota) a seguinte função (Get, Post)
server.use('/', buscarGestantes, buscarGestantePorId, atualizarGestantePorId, deletarGestantePorId);
server.use('/cadastro', cadastrarGestante);
// server.use('/:id', buscarGestantePorId);

// Quando rodando localmente, garantir que o servidor está ativo
server.listen(8000, () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    console.log(`Servidor iniciado em ${dia}/${mes}/${ano}`)
})