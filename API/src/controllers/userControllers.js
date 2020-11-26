const Users = require('../models/userModel'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');
    

exports.register = async(req, res) => {
    console.time();

    const isExist = await Users.checkEmail(req.body.email)
    if (isExist != 0)
        res.json({ error: true, message: 'user exist' })
    else {
        const salt = await bcrypt.genSalt(10) // Création du salt random
        const hash = await bcrypt.hash(req.body.password, salt) // Chiffrement du password
        const isRegister = await Users.registerUser(req.body.firstName, req.body.lastName, req.body.email, hash)
        if (isRegister === 1){
            res.json({ error: true, message: 'Inscription échouée' });
        }
        else{
            res.json({ error: false, message: 'Inscription réussie' });
        }
           
    }

    console.timeEnd();
    console.log('End Register');
}

exports.login = async(req, res) => {
    const isExist = await Users.checkEmail(req.body.email)
    if(isExist != 0){
        const bddHash = await Users.getPassword(req.body.email);
        const bddUserId = await Users.getUserId(req.body.email);

        /** Compare stored password with new encrypted password */
        bcrypt.compare(req.body.password, bddHash, function(err, isMatch) {
            if (err) {
                throw err
            } else if (!isMatch) {
                console.log("Password doesn't match!");
                res.json({ error: true, message: 'Mot de passe incorrect'})
            } else {
                console.log('Login réussie !')
                
                res.status(202).json({
                    error: false, 
                    message: 'Connexion Réussie',
                    userId: bddUserId,
                    token: jwt.sign(
                        { userId: bddUserId },
                        'RANDOM_TOKEN',
                        { expiresIn: '24h' }
                    )
                });
                             
            }
        });
    }
    else{
        res.json({ error: true, message: 'L\'utilisateur n\'existe pas'});
    }

}

exports.getUser = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN');
    const userId = decodedToken.userId;
    const userExist = await Users.checkId(userId);
    if(userExist != 1){
        res.status(401).json({error: true, message: 'Utilisateur Non reconnu'})
    }else{
        const user = await Users.getUserInfo(userId);
        res.status(200).json({
            error: false,
            message: 'Connected',
            userId: user.id,
            userEmail: user.email,
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userPseudo: user.pseudo,
            firstConnection: user.isFirstConnection,
            isAlertActivate: user.isAlertActivate,
            userlowQuant: user.lowQuant
        })
    }

    //getUserInfo
}