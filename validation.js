// Dependencias:
import Joi from "joi";

// Modelo (Schema) que os inputs de dados devem respeitar
export const gestanteSchema = (requisicao) => {
    const schema = Joi.object({
        nome: Joi.string().min(0).max(50).required(),
        data: Joi.string().min(8).max(10).required(),
        endereco: Joi.string().min(0).max(50).required(),
        telefone: Joi.string().min(11).max(11).required(),
        equipe: Joi.string().required()
    });

    // Validando o modelo
    const {error} = schema.validate(requisicao, {abortEarly: false});// Não quero que aborte a validação no primeiro erro (Verificar todos os erros)

    return error;
}


// "nome": "Mariá Spina",
// "data": "1997-04-17T00:00:00.000Z",
// "endereco": "Rua Renata Camara Agondi, nº 86",
// "telefone": "1996398740",
// "equipe": "azul"