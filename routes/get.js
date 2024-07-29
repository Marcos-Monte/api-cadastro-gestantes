// Dependencias:
import { PrismaClient } from '@prisma/client';
import express from 'express';

// Componentes
// import gestantes from '../data.js';

// Instanciando objeto de integração com banco de dados
const prisma = new PrismaClient()

// Instanciando objeto de definição de rotas
const router = express.Router();

// Método GET: Mostra os registro do Banco de Dados
router.get('/', async (req, res) => {
    const gestantes = await prisma.gestante.findMany();
    // Resposta da requisição
    res.status(200).json(gestantes)
})

export default router;