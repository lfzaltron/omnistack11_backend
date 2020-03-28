const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    },

    validateCreate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string()
                    .required()
                    .email(),
                whatsapp: Joi.string()
                    .required()
                    .min(10)
                    .max(11),
                city: Joi.string().required(),
                uf: Joi.string()
                    .required()
                    .length(2)
            })
        });
    }
};
