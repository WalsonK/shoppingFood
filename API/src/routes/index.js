const routes = require('express').Router(), // Chargement d'express Router
    user = require('../controllers/userControllers'), // Chargement du controller User
    userMiddelware = require('../middlewares/userMiddlewares'); // Chargement du middelware User

routes.post('/user', userMiddelware.register, user.register);

module.exports = routes; // Export des routes