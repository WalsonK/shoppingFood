const routes = require('express').Router(), // Chargement d'express Router
    user = require('../controllers/userControllers'), // Chargement du controller User
    userMiddelware = require('../middlewares/userMiddlewares'); // Chargement du middelware User

routes.post('/register', userMiddelware.register, user.register);
routes.post('/login', userMiddelware.login, user.login);

routes.get('/home', userMiddelware.auth, user.getUser);
routes.post('/updateUser', userMiddelware.auth, user.modifyUser); // + 

module.exports = routes; // Export des routes