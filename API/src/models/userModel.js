exports.checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        bdd.query('SELECT COUNT(*) as "count" FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
            resolve(results[0].count)
        });
    })
}

exports.createHouse = () => {
    return new Promise((resolve, reject) => {
        bdd.query('INSERT INTO `house` (lowQuant) VALUES (?)', [0], (error, results, fields) =>{
            resolve(results.insertId);
        })
    });

}

exports.registerUser = (firstName, lastName, email, hash, houseId) => {
    return new Promise((resolve, reject) => {
        bdd.query('INSERT INTO user SET ?', { email: email, firstName: firstName, lastName: lastName, hash: hash, idHouse: houseId}, (error, results, fields) => {
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

exports.getAllPseudo = () =>{
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT `email` FROM `user`', (error, results, fields) =>{
            resolve(results)
        });
    })
}

exports.updateFirst = (id, pseudo, alert) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('UPDATE `user` SET `pseudo`= ?, `isFirstConnection`= ?, `isAlertActivate`= ?, `isAdmin`= ? WHERE `id` = ?', [pseudo, false, alert, true, id], (error, results, fields) => {
            resolve(results.changedRows)
        });
    })
}

exports.getHouse = (id) =>{
    return new Promise((resolve, reject) => {
        bdd.query('SELECT `idHouse` FROM `user` WHERE `id` = ?', [id], (error, results, fields) =>{
            resolve(results[0].idHouse)
        })
    })
}
exports.getHouseLowQuant = (id) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT `lowQuant` FROM `house` WHERE `idHouse` = ?', [id], (error, results, fields) =>{
            resolve(results[0].lowQuant)
        })
    })
}

exports.setHouseLowQuant = (id, lowQuant) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('UPDATE `house` SET `lowQuant` = ? WHERE `idHouse` = ?', [lowQuant, id], (error, results, fields) =>{
            resolve(results.changedRows)
        })
    })
}

exports.updateFamily = (pseudo, statut, houseId) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('UPDATE `user` SET `idHouse` = ?, `isAdmin` = ? WHERE `email` = ?', [houseId, statut, pseudo], (error, results, fields) =>{
            resolve(results.changedRows)
        })
    })
}

exports.updateUser = (firstName, lastName, pseudo, alert, lowQuant, email) => {
    return new Promise((resolve, reject) =>{
        bdd.query('UPDATE `user` SET `firstName` = ?, `lastName`= ?, `pseudo` = ?, `isAlertActivate` = ?, `lowQuant` = ? WHERE `email` = ?', 
        [firstName, lastName, pseudo, alert, lowQuant, email], (error, results, fields) =>{
            resolve(results.changedRows)
        })
    })
}
exports.getAllRoom = (houseId) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT * FROM `room` WHERE `idHouse` = ?', [houseId], (error, results, fields) =>{
            resolve(results)
        })
    })
}

exports.createRoom = (roomName, lastModif, houseId) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('INSERT INTO `room` SET ?', {nameRoom: roomName, lastModif: lastModif, idHouse: houseId}, (error, results, fields) =>{
            resolve(results.insertId)
        })
    })
}

exports.deleteRoom = (houseId, roomId) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('DELETE FROM `room` WHERE `idHouse` = ? AND `idRoom` = ?', [houseId, roomId], (error, results, fields) =>{
            resolve(results.affectedRows)
        })
    })
}

exports.updateRoom = (roomName, lastModif, roomId, houseId) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('UPDATE `room` SET `nameRoom` = ?, `lastModif` = ? WHERE `idRoom` = ? AND `idHouse` = ?',
        [roomName, lastModif, roomId, houseId], (error, results, fields) =>{
            resolve(results.changedRows)
        })
    })
}

exports.getAllItems = (roomId) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('SELECT * FROM `item` WHERE `idRoom` = ?', [roomId], (error, results, fields) =>{
            resolve(results)
        })
    })
}

exports.createItem = (itemName, itemMaxQuant, imgSrc, idRoom) =>{
    return new Promise((resolve, reject) =>{
        bdd.query('INSERT INTO `item` SET ?',
        {nameItem: itemName, nowQuant: itemMaxQuant, maxQuant: itemMaxQuant, imgSrc: imgSrc, idRoom: idRoom}, 
        (error, results, fields) =>{
            resolve(results.insertId)
        })
    })
}