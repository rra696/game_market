const User = require('../config/db').user;

module.exports.findByEmailAndPassword = function (email, password) {
    return User.findOne({where: {email: email, password: password}});
}

module.exports.updateUserById = function (userId, data) {
    
    return User.update(
        data, 
    {
        where: {
            id: userId
        }
    });

}