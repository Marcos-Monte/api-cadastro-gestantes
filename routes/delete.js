// Dependencias:
import { PrismaClient } from "@prisma/client";
import express from 'express';

// Instanciando objeto de integração com banco de dados
const prisma = new PrismaClient();

// Instanciando objeto de definição de rotas
const router = express.Router();

// Método DELETE: Deleta um registro do Banco de Dados baseado no ID fornecido.
router.delete('/:id', async (req, res) => {

    // ID fornecido pela requisição
    const {id} = req.params;

    try{
        // Verifica se o registro existe
        const gestanteSelecionada = await prisma.gestante.findUnique({
            where: {id}
        })

        // Se não tiver o registro no Banco de dados
        if(!gestanteSelecionada){
            res.status(404).json({message: 'Registro não encontrado!'});
            // Garante que a requisição seja suspensa em caso do erro
            return;
        }

        // Deleta o registro
        await prisma.gestante.delete({
            where: {id},
        })

        res.status(200).json(gestanteSelecionada)

    } catch(error){
        console.error(error);  // Log do erro para diagnóstico
        res.status(500).json({ message: 'Erro ao deletar o registro!', error: error.message });
    }

})

export default router;
