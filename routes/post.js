// Dependencias
import { PrismaClient } from '@prisma/client';
import express from 'express';
// import { randomUUID } from 'node:crypto';

// Componentes
import { gestanteSchema } from '../validation.js';

// Instanciando objeto que irá criar as rotas
const router = express.Router();

// Instanciando objeto de integração com banco de dados
const prisma = new PrismaClient()

// Método POST: Adicionar novo registro ao Banco de Dados
router.post('/', async (req, res) => {
    // Armazenando o 'corpo' da requisição
    const dataGestante = req.body;

    // Armazenando o resultado da validacao
    const validacao = gestanteSchema(dataGestante);

    // Em caso de erro: Mostrar qual e parar a requisição
    if(validacao){
        res.status(400).json(validacao.details);
        // Garante que a requisição pare após achar um erro
        return;
    }

    try{

        // Criar o novo registro no banco de dados
        const novaGestante = await prisma.gestante.create({
            data: {
                nome: dataGestante.nome,
                data: dataGestante.data,
                // data: new Date(dataGestante.data),
                endereco: dataGestante.endereco,
                telefone: dataGestante.telefone,
                equipe: dataGestante.equipe
            }
        })

        // Responder com o registro criado
        res.status(201).json(novaGestante)

    } catch (error){
        
        // Tratar possíveis erros do banco de dados
        res.status(500).json({message: 'Erro ao criar registro', error: error.message})

    }

})


export default router;

