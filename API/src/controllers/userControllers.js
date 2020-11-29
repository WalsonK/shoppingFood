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
        
        if(req.body.houseOwner === true){
            const isHouseOwner = await Users.createHouse();
            const isRegister = await Users.registerUser(req.body.firstName, req.body.lastName, req.body.email, hash, isHouseOwner);
            if (isRegister === 1){
                res.json({ error: true, message: 'Inscription échouée' });
            }
            else{
                res.json({ error: false, message: 'Inscription réussie' });
            }
        }else{
            const isRegister = await Users.registerUser(req.body.firstName, req.body.lastName, req.body.email, hash, null);
            if (isRegister === 1){
                res.json({ error: true, message: 'Inscription échouée' });
            }
            else{
                res.json({ error: false, message: 'Inscription réussie' });
            }
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
    const userId = req.body.id;
    const userExist = await Users.checkId(userId);
    if(userExist != 1){
        res.status(400).json({error: true, message: 'Utilisateur Non reconnu'})
    }else{
        const user = await Users.getUserInfo(userId);
        const resultsArray = await Users.getAllPseudo();
        const pseudoArray = [];
        for(var i=0; i < resultsArray.length; i++){
            pseudoArray[i] = resultsArray[i].email;
        };
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
            userlowQuant: user.lowQuant,
            houseOwner: user.idHouse,
            usersPseudo: pseudoArray
        })
    }

    //getUserInfo
}

exports.firstConnect = async(req, res) =>{
    //this.userId, this.pseudo, this.isAlertActivate, this.lowQuant, this.myTeam
    const userId = req.body.id;
    const a = await Users.updateFirst(userId, req.body.pseudo, req.body.alert);
    const houseId = await Users.getHouse(userId);
    const b = await Users.setHouseLowQuant(houseId, req.body.lowQuant); 
    const c = await Users.updateFamily(req.body.memberPseudo, req.body.memberStatut, houseId);
    // (a != 0) = ok & (b != 0) = ok &
    if(a != 0 && b !=0 && c != 0){
        res.status(200).json({ error: false, message: ' réussie' });
    }
    else{
        res.status(304).json({ error: true, message: 'échouée ' });
    }
}

exports.modifyUser = async(req, res) =>{
    const isUserUpdate = await Users.updateUser(req.body.firstName, req.body.lastName, req.body.pseudo, req.body.alert, req.body.lowQuant, req.body.email)
    if(isUserUpdate == 0){
        res.status(304).json({error: true, message: 'Informations non modifiées !'})
    }else{
        res.status(200).json({error: false, message: 'Informations mis à jour !'})
    }
}