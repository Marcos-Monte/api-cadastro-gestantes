// Dependencias:
import { PrismaClient } from '@prisma/client';
import express from 'express';

// Instanciando objeto de integração com banco de dados
const prisma = new PrismaClient();

// Instanciando objeto de definição de rotas
const router = express.Router();

// Método PUT: Altera valores de um registro do Banco de Dados.
router.put('/:id', async (req, res) => {

    // ID fornecido pela requisição
    const {id} = req.params;

    // Corpo das alterações feitas via requisição
    const corpoRequisicao = req.body;
    // console.log(`corpoRequisivao --> ${corpoRequisicao}`)

    try{
        // Verifica se o registro existe
        const gestanteSelecionada = await prisma.gestante.findUnique({
            where: {id},
        })

        // Se não tiver o registro no Banco de dados
        if(!gestanteSelecionada){
            res.status(404).json({message: 'Registro não encontrado!'});
            // Garante que a requisição seja suspensa em caso do erro
            return;
        }

        // Prepara os dados atualizados
        const camposAtualizados = {};
        for (const chave in corpoRequisicao) {
            if (gestanteSelecionada.hasOwnProperty(chave)) {
                camposAtualizados[chave] = corpoRequisicao[chave];
            }
        }

        // Atualiza o registro no banco de dados
        const gestanteAtualizada = await prisma.gestante.update({
            where: { id },
            data: camposAtualizados,
        });

        res.status(200).json(gestanteAtualizada)

    } catch(error){
        console.error(error);  // Log do erro para diagnóstico
        res.status(500).json({ message: 'Erro ao atualizar o registro!', error: error.message });
    }
})


// Exportando para ser utilizado em outros componentes
export default router;