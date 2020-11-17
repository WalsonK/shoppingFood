exports.checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        bdd.query('SELECT COUNT(*) as "count" FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
            resolve(results[0].count)
        });
    })
}

exports.registerUser = (firstName, lastName, email, hash) => {
    return new Promise((resolve, reject) => {
        bdd.query('INSERT INTO user SET ?', { email: email, firstName: firstName, lastName: lastName, hash: hash }, (error, results, fields) => {
            resolve(results.insertId)
        });
    }) 
}

exports.loginUser = (email,hash) => {
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT COUNT(*) as "count" FROM `user` WHERE `email` = ? AND `hash` = ?',{ email: email, hash: hash }, (error, results, fields) =>{
            resolve(results.insertId)
        });
    })
}