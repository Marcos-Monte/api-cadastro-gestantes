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
    try{
        if(gestantes <= 0){
            res.status(404).send('Não há dados a serem visualizados');
            return;
        }
        // Resposta da requisição
        res.status(200).json(gestantes)

    } catch(error){
        res.status(400).json({message: 'Erro ao visualizar dados', error: error.message})
    }
})

export default router;