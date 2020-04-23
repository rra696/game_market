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
            console.log(error);
            res.status(200).json(error)
        })
}

exports.login = function (req, res) {
    const {email, password} = req.body;

    userRepository.findByEmailAndPassword(email, password)
        .then(user => {

            if (!user) {
                res.status(200).json({error: "User not found"});
            }

            const accessToken = tokenUtils.getAccessToken(user);
            const refreshToken = tokenUtils.getRefreshToken(user);

            updateData = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            userRepository.updateUserById(user.id, updateData)
                .then(updatedRows => {
                    res.status(201).json({success: "OK", accessToken: accessToken, refreshToken: refreshToken});
                })
                .catch(err => {
                    res.json(err);
                });

        })
        .catch(err => {
            res.status(200).json({error: err});
        })


}