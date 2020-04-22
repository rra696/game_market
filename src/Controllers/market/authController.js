const User = require('../../config/db').user;
const {resolveError} = require('../../Utils/ErrorUtils/errorResolver');
const authService = require('../../Services/authService');
const userRepository = require('../../Repositories/userRepository');

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

exports.login = function (req, res) {
    const {email, password} = req.body;
    
    userRepository.findByEmailAndPassword(email, password)
        .then(user => {

            if (!user) {
                res.status(200).json({error: "User not found"});
            }

            const accessToken = authService.getAccessToken(user);
            const refreshToken = authService.getRefreshToken(user);

            updateData = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            userRepository.updateUserById(user.id, updateData)
            .then(updatedRows => {

                if (!updatedRows[0]) {
                    res.status(200).json({error: "Failed login"});
                }
                
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