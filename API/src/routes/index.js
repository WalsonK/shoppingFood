const routes = require('express').Router(), // Chargement d'express Router
    user = require('../controllers/userControllers'), // Chargement du controller User
    userMiddelware = require('../middlewares/userMiddlewares'); // Chargement du middelware User

routes.post('/register', userMiddelware.register, user.register);
routes.post('/login', userMiddelware.login, user.login);

routes.post('/home', userMiddelware.auth, user.getUser);
routes.post('/firstConnect', userMiddelware.auth, user.firstConnect);
routes.post('/updateUser', userMiddelware.auth, user.modifyUser); // + 

//Room
routes.post('/getRooms', userMiddelware.auth, user.getAllRooms);
routes.post('/createRoom', userMiddelware.auth, user.createRoom);
routes.post('/deleteRoom', userMiddelware.auth, user.deleteRoom);
routes.post('/updateRoom', userMiddelware.auth, user.updateRoom);

//Item
routes.post('/getItems', userMiddelware.auth, user.getAllItems);
routes.post('/createItem', userMiddelware.auth, user.createItem);
routes.post('/deleteItem', userMiddelware.auth, user.deleteItem);
routes.post('/updateItem', userMiddelware.auth, user.updateItem);

//Shop List
routes.post('/getShopList', userMiddelware.auth, user.getShopList);

module.exports = routes; // Export des routes