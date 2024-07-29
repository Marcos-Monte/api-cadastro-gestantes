// Dependencias
import express from 'express';
import { randomUUID } from 'node:crypto';

// Componentes
import gestantes from '../data.js';
import { gestanteSchema } from '../validation.js';

// Instanciando objeto que irá criar as rotas
const router = express.Router();

// Método GET: Mostra os registro do Banco de Dados
router.get('/', (req, res) => {
    // Resposta da requisição
    res.status(200).json(gestantes)
})


// Método POST: Adicionar novo registro ao Banco de Dados
router.post('/', (req, res) => {
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

    // Adiciona um 'id' randomico ás propriedades do objeto
    const novaGestante = {...req.body, "id": randomUUID()};

    // Banco de dados recebe um novo registro
    gestantes.push(novaGestante);

    // Resposta da requisiçãoo
    res.status(201).json(novaGestante)

})


export default router;

