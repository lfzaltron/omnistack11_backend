const connection = require('../database/connection');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return response
                .status(400)
                .json({ error: 'No ONG found with this ID.' });
        }

        return response.json(ong);
    },

    validateCreate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.string()
                    .required()
                    .length(8)
            })
        });
    }
};
