// Dependencias: Joi = Biblioteca para lidar com validações
import Joi from "joi";

// Modelo (Schema) que os inputs de dados devem respeitar
export const gestanteSchema = (requisicao) => {
    const schema = Joi.object({
        // id: Joi.string().required(),
        nome: Joi.string().min(1).max(50).required(),
        data: Joi.date().iso().required(), // Valida que 'data' é uma data no formato ISO
        endereco: Joi.string().min(1).max(100).required(),
        telefone: Joi.string().min(11).required(), // Ajuste para length(11) se o telefone tiver exatamente 11 dígitos
        equipe: Joi.string().valid('azul', 'amarela', 'verde').required() // Valida que 'equipe' deve ser um dos valores válidos
    });

    // Validando o modelo
    const {error} = schema.validate(requisicao, {abortEarly: false});// Não aborta na primeira falha

    return error;
}
