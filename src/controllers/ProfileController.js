const connection = require('../database/connection');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    },

    validateIndex() {
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string()
                    .required()
                    .length(8)
            }).unknown()
        });
    }
};
