const User = require('../config/db').user;

module.exports.findByEmailAndPassword = function (email, password) {
    return User.findOne({where: {email: email, password: password}});
}

module.exports.findByEmail = function (email) {
    return User.findOne({where: {email: email}});
}

module.exports.updateUserById = function (userId, data) {
    return new Promise((resolve, reject) => {
        User.update(data,
            {
                where: {
                    id: userId
                }
            })
            .then(updatedRows => {
                    if (!updatedRows[0]) {
                        throw new Error("failed update refresh token");
                    }
                    resolve(data)
                }
            )
            .catch(error=>reject(error))
    })
}