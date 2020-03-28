const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post(
    '/sessions',
    SessionController.validateCreate(),
    SessionController.create
);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.validateCreate(), OngController.create);

routes.get(
    '/profile',
    ProfileController.validateIndex(),
    ProfileController.index
);

routes.get(
    '/incidents',
    IncidentController.validateIndex(),
    IncidentController.index
);
routes.post(
    '/incidents',
    IncidentController.validateCreate(),
    IncidentController.create
);
routes.delete(
    '/incidents/:id',
    IncidentController.validateDelete(),
    IncidentController.delete
);

module.exports = routes;
