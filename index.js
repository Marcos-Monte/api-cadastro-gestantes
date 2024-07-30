import cors from 'cors';
import express from 'express';

import buscarGestantes from './routes/get.js';
import cadastrarGestante from './routes/post.js';

const server = express();
server.use(cors({
    origin: 'http://localhost:3000', //URL do FrontEnd (Next.js)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}))

server.use(express.json()); // Toda requisição terá seu corpo convertido para JS
server.use('/listas', buscarGestantes);
server.use('/', cadastrarGestante);



server.listen(8000, () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();
    console.log(`Servidor iniciado em ${dia}/${mes}/${ano}`)
})