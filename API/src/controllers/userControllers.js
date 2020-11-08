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
            res.json({ error: false, message: 'user register' })
        else
            res.json({ error: true, message: 'user not register' })
    }

    console.timeEnd();
}