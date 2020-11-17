const routes = require('express').Router(), // Chargement d'express Router
    user = require('../controllers/userControllers'), // Chargement du controller User
    userMiddelware = require('../middlewares/userMiddlewares'); // Chargement du middelware User

routes.post('/register', userMiddelware.register, user.register);
routes.post('/login', userMiddelware.login, user.login); 

module.exports = routes; // Export des routes