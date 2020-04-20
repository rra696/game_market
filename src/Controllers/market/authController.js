const User = require('../../config/db').user;
const {resolveError} = require('../../Utils/ErrorUtils/errorResolver');

exports.register = function (req, res) {
    const {email, password} = req.body;
    User.create({email: email, password: password})
        .then(user => {
            res.status(201).json({success: "Удачно созданный челик" + user.id});
        })
        .catch(err => {
            const errorResult = resolveError(err);
            res.status(200).json({errors: errorResult});
        });
}

exports.login = function (req, res) {
    res.status(201).json({message: "OK"});
}