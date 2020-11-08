exports.register = (req, res, next) => {

console.log('Start register')

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (req.body.email === undefined || req.body.name === undefined || req.body.password === undefined) {
        res.json({ error: true, message: 'Veuillez renseigner les champs !' });
    }

    else if (req.body.email.length < 5) {
        res.json({ error: true, message: 'L\'email est trop courte !' });
    }else if (req.body.name.length <= 2) {
        res.json({ error: true, message: 'Le nom est trop court !' });
    }else if (req.body.password.length < 5) {
        res.json({ error: true, message: 'Le mot de passe est trop court !' });
    }
    
    else if (!re.test(String(req.body.email).toLowerCase())) {
        res.json({ error: true, message: 'L\'email est incorrect !' });
    } else
        next()
}