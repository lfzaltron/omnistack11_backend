const connection = require('../database/connection');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        //this 'X-Total-Count is good practice'
        response.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        return response.json(incidents);
    },

    validateIndex() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number()
            })
        });
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    validateCreate() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                value: Joi.number().required()
            }),
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string()
                    .required()
                    .length(8)
            }).unknown()
        });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response
                .status(401)
                .json({ error: 'Operation not permitted.' });
        }

        await connection('incidents')
            .where('id', id)
            .delete();

        return response.status(204).send();
    },

    validateDelete() {
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required()
            }),
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string()
                    .required()
                    .length(8)
            }).unknown()
        });
    }
};
