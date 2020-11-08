exports.checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        bdd.query('SELECT COUNT(*) as "count" FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
            resolve(results[0].count)
        });
    })
}

exports.registerUser = (name, email, hash) => {
    return new Promise((resolve, reject) => {
        bdd.query('INSERT INTO user SET ?', { email: email, name: name, hash: hash }, (error, results, fields) => {
            resolve(results.insertId)
        });
    }) 
}