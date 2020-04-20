const User = require('../config/db').user;

module.exports.findByEmailAndPassword = function (email, password) {
    return User.findOne({where: {email: email, password: password}});
}
