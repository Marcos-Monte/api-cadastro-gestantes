// Dependencias:
import { PrismaClient } from '@prisma/client';
import express from 'express';

// Instanciando objeto de integração com banco de dados
const prisma = new PrismaClient();

// Instanciando objeto de definição de rotas
const router = express.Router();

// Método GET: Mostra o registro, selecionado via ID, do Banco de Dados
router.get('/:id', async (req, res) => {

    // ID fornecido pela requisição
    const {id} = req.params;

    try{
        // Verifica se o registro existe
        const gestanteSelecionada = await prisma.gestante.findUnique({
            where: { id },
        });

        // Se não tiver o registro no Banco de dados
        if(!gestanteSelecionada){
            res.status(404).json({message: 'Registro não encontrado!'});
            // Garante que a requisição seja suspensa em caso do erro
            return;
        }

        res.status(200).json(gestanteSelecionada)

    }catch(error){
        console.error(error);  // Log do erro para diagnóstico
        res.status(500).json({message: 'Erro ao buscar registro!', error: error.message});

    }
})


// Exportando para ser utilizado em outros componentes
export default router;