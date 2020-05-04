const User = require('../../config/db').user;
const {resolveError} = require('../../Utils/ErrorUtils/errorResolver');
const tokenUtils = require('../../Utils/Token/tokenUtils');
const userRepository = require('../../Repositories/userRepository');
const authService = require('../../Services/authService');

exports.register = function (req, res) {
    const {email, password} = req.body;

    User.create({email: email, password: password})
        .then(user => {
            res.status(201).json({success: "Registration user is success"});
        })
        .catch(err => {
            const errorResult = resolveError(err);
            res.status(200).json({errors: errorResult});
        });
}

exports.refreshTokens = function (req, res) {
    const {refreshToken} = req.body;
    
    authService.refreshTokens(refreshToken)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(200).json(error)
        })
}

exports.login = function (req, res) {
    const {email, password} = req.body;

    authService.login(email, password)
    .then(tokens => {
        res.status(201).json({success: "OK", accessToken: tokens.accessToken, refreshToken: tokens.refreshToken});
    })
    .catch(error => {
        res.status(200).json(error);
    })
    
}