// Dependencias:
import { PrismaClient } from '@prisma/client';
import express from 'express';

// Instanciando objeto de integração com banco de dados
const prisma = new PrismaClient()

// Instanciando objeto de definição de rotas
const router = express.Router();

// Método GET: Mostra os registro do Banco de Dados
router.get('/', async (req, res) => {
    // Instanciando o conteudo do banco de dados completo
    const gestantes = await prisma.gestante.findMany();
    try{
        // Se não tiver registros no Banco de dados
        if(!gestantes){
            res.status(404).json('Não há dados a serem visualizados');
            // Garante que a requisição seja suspensa em caso do erro
            return;
        }
        // Resposta da requisição
        res.status(200).json(gestantes)

    } catch(error){
        res.status(400).json({message: 'Erro ao visualizar dados'})
    }
})

// Exportando para ser utilizado em outros componentes
export default router;