const Users = require('../models/userModel'),
    bcrypt = require('bcrypt');

exports.register = async(req, res) => {
    console.time();

    const isExist = await Users.checkEmail(req.body.email)
    if (isExist != 0)
        res.json({ error: true, message: 'user exist' })
    else {
        const salt = await bcrypt.genSalt(10) // Création du salt random
        const hash = await bcrypt.hash(req.body.password, salt) // Chiffrement du password
        const isRegister = await Users.registerUser(req.body.name, req.body.email, hash)
        if (isRegister == 1)
            res.json({ error: false, message: 'Inscription réussie' })
        else
            res.json({ error: true, message: 'Inscription échouée' })
    }

    console.timeEnd();
}

exports.login = async(req, res) => {
    const isExist = await Users.checkEmail(req.body.email)
    if(isExist != 0){
        const salt = await bcrypt.genSalt(10) // Création du salt random
        const hash = await bcrypt.hash(req.body.password, salt) // Chiffrement du password
        const isLogged = await Users.loginUser(req.body.email, hash) // IN error
        if(isLogged == 1){
            //Login script !!
            res.json({ error: false, message: 'Connexion réussie Controller'})
        }
        else{
            res.json({ error: true, message: 'Connexion échouée..' })
        }
    }
    else{
        res.json({ error: true, message: 'L\'utilisateur n\'existe pas'});
    }

}