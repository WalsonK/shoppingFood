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

exports.checkUser = (email,hash) => {
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT COUNT(*) as "count" FROM `user` WHERE `email` = ? AND `hash` = ?',[email,hash], (error, results, fields) =>{
            resolve(results[0].count)
        });
    })
}

exports.getUserId = (email) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT `id` FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
            resolve(results[0].id)
        });
    })
}

exports.getPassword = (email) => {
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT `hash` FROM `user` WHERE `email` = ?', [email], (error, results, fields) =>{
            resolve(results[0].hash)
        });
    })
}

exports.checkId = (id) => {
    return new Promise((resolve, reject) => {
        bdd.query('SELECT COUNT(*) as "count" FROM `user` WHERE `id` = ?', [id], (error, results, fields) => {
            resolve(results[0].count)
        });
    })
}

exports.getUserInfo = (id) => {
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT * FROM `user` WHERE `id` = ?', [id], (error, results, fields) => {
            resolve(results[0])
        });
    })
}

exports.updateUser = (pseudo, alert, lowQuant, email) => {
    return new Promise((resolve, reject) =>{
        bdd.query('UPDATE `user` SET `pseudo` = ?, `isAlertActivate` = ?, `lowQuant` = ? WHERE `email` = ?', 
        [pseudo, alert, lowQuant, email], (error, results, fields) =>{
            resolve(results.changedRows)
        })
    })
}