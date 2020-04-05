const express = require('express');

const SeboController = require('./controllers/SeboController');
const BookController = require('./controllers/BookController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/sebo', SeboController.index);
routes.post('/sebo', SeboController.create);

routes.get('/profile', ProfileController.index);

routes.get('/books', BookController.index);
routes.post('/books', BookController.create);
routes.delete('/books/:id', BookController.delete);

module.exports = routes;
