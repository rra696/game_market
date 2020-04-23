const User = require('../../config/db').user;
const {resolveError} = require('../ErrorUtils/errorResolver');
const jwt = require('jsonwebtoken');

exports.getAccessToken = function(user) {
    let accessToken = jwt.sign({email: user.email}, process.env.TOKEN_KEY, {expiresIn: '10m'});
    return accessToken;
}

exports.getRefreshToken = function(user) {
    let refreshToken = jwt.sign({email: user.email}, process.env.TOKEN_KEY, {expiresIn: "1h"});
    return refreshToken;
}

exports.verifyToken = function(token) {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return decoded;
}