const Users = require('../models/userModel'),
    bcrypt = require('bcrypt');
    //mailer = require('../mail/mail');

exports.register = async(req, res) => {
    console.time();

    const isExist = await Users.checkEmail(req.body.email)
    if (isExist != 0)
        res.json({ error: true, message: 'user exist' })
    else {
        const salt = await bcrypt.genSalt(10) // Création du salt random
        const hash = await bcrypt.hash(req.body.password, salt) // Chiffrement du password
        const isRegister = await Users.registerUser(req.body.firstName, req.body.lastName, req.body.email, hash)
        if (isRegister == 1){
            //mailer.sendMail();
    
            res.status(201).json({ error: false, message: 'Inscription réussie' });
        }
        else
            res.status(500).json({ error: true, message: 'Inscription échouée' })
    }

    console.timeEnd();
}

exports.login = async(req, res) => {
    const isExist = await Users.checkEmail(req.body.email)
    if(isExist != 0){
        const salt = await bcrypt.genSalt(10) // Création du salt random
        const hash = await bcrypt.hash(req.body.password, salt) // Chiffrement du password
        const isLogged = await Users.checkUser(req.body.email, hash) // IN error
        if(isLogged == 1){
            const id = await Users.getUserId(req.body.email, hash);
            //Login script !!
            res.status(200).json({ 
                userId: id,
                token: 'TOKEN'
            })
        }
        else{
            res.status(401).json({ error: true, message: 'Connexion échouée..' })
        }
    }
    else{
        res.status(500).json({ error: true, message: 'L\'utilisateur n\'existe pas'});
    }

}
/*
exports.login2 = (req, res, next) => {
    Users.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: 'TOKEN'
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };*/