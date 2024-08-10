// Dependencias
import { PrismaClient } from '@prisma/client';
import express from 'express';

// Modelo de validação do novo registro
import { gestanteSchema } from '../validation.js';

// Instanciando objeto que irá criar as rotas
const router = express.Router();

// Instanciando objeto de integração com banco de dados
const prisma = new PrismaClient()

// function teste(valor){
//     return (!valor)? 'Não Declarado': valor;
// }

// Método POST: Adicionar novo registro ao Banco de Dados
router.post('/', async (req, res) => {
    // Armazenando o 'corpo' da requisição
    const dataGestante = req.body;

    // Armazenando o resultado da validacao (true ou false)
    const validacao = gestanteSchema(dataGestante);

    // Em caso de 'false': Mostrar qual e parar a requisição
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
                endereco: dataGestante.endereco,
                telefone: dataGestante.telefone,
                equipe: dataGestante.equipe,
                parceiro: dataGestante.parceiro,
                dum: dataGestante.dum,
                gestacoes: dataGestante.gestacoes,
                risco: dataGestante.risco,
            }
        })

        // Responder com o registro criado
        res.status(201).json(novaGestante)

    } catch (error){
        
        // Tratar possíveis erros do banco de dados
        res.status(500).json({message: 'Erro ao criar registro', error: error.message})

    }

})

// Exportando para ser utilizado em outros componentes
export default router;

