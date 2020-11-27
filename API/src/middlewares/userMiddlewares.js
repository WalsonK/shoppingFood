const sendMail = require('../mail/mail'),
    Users = require('../models/userModel'),
    jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {

console.log('Start register')

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (req.body.email === undefined || req.body.firstName === undefined || req.body.lastName === undefined || req.body.password === undefined) {
        res.json({ error: true, message: 'Veuillez renseigner les champs !' });
    }

    else if (req.body.email.length < 5) {
        res.json({ error: true, message: 'L\'email est trop courte !' });
    }else if (req.body.firstName.length <= 2) {
        res.json({ error: true, message: 'Le prénom est trop court !' });
    }else if(req.body.lastName.length <= 2){
        res.json({ error: true, message: 'Le nom est trop court !' });
    }
    else if (req.body.password.length < 5) {
        res.json({ error: true, message: 'Le mot de passe est trop court !' });
    }
    
    else if (!re.test(String(req.body.email).toLowerCase())) {
        res.json({ error: true, message: 'L\'email est incorrect !' });
    } else{
        //mailer.sendMail();
        sendMail(req.body.email, req.body.firstName, function(err, data){
            if(err)
                res.status(500).json( { message: 'Erreur Interne !'+ err })  //console.log('Error :' + err);
            else
            res.status(200).json({ error: false, message: 'Inscription réussi + mail ok !' });
        });
        next();
    }
        
}

exports.login = (req, res, next) => {
    console.log('start loggin !');

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (req.body.email === undefined || req.body.password === undefined) {
        res.status(500).json({ error: true, message: 'Veuillez renseigner les champs !' });
    }
    else if (req.body.email.length < 5) {
        res.status(500).json({ error: true, message: 'L\'email est trop courte !' });
    }else if (req.body.password.length < 5) {
        res.status(500).json({ error: true, message: 'Le mot de passe est trop court !' });
    }
    else if (!re.test(String(req.body.email).toLowerCase())) {
        res.status(500).json({ error: true, message: 'L\'email est incorrect !' });
    } else{
        //res.status(200).json({ error: false, message: 'Connection réussi au middleware !' });
        next();
    }

}
exports.auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN');
        const id = decodedToken.userId;
        if(req.body.id == id){
            next();
        }else{
            res.status(401).json({error: true, message: 'Requete non authentifier'});
        }
    }
    catch (error){
        res.status(200).json({error: true, message: 'Veuillez vous authentifier'})
    }
}