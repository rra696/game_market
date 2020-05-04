const tokenUtils = require('../Utils/Token/tokenUtils');
const userRepository = require('../Repositories/userRepository');

exports.refreshTokens = (refreshToken) => {
    return new Promise((resolve, reject) => {
        const data = tokenUtils.verifyToken(refreshToken);

        if (data) {
            const {email} = data;
            userRepository.findByEmail(email)
                .then(user => {
                    if (!user || user.refreshToken !== refreshToken) {
                        throw new Error("invalid user");
                    }
                    const updateTokens = {
                        accessToken: tokenUtils.getRefreshToken(user),
                        refreshToken: tokenUtils.getAccessToken(user)
                    }
                    return userRepository.updateUserById(result.userId, result.updateTokens);
                })
                .then(data => {
                    resolve({
                        success: "OK",
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken
                    });
                })
                .catch(err => {
                    reject({error: err});
                })
        }
    })
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {

        userRepository.findByEmailAndPassword(email, password)
        .then(user => {

            if (!user) {
                throw new Error("User not found");
            }

            const accessToken = tokenUtils.getAccessToken(user);
            const refreshToken = tokenUtils.getRefreshToken(user);

            updateData = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            return userRepository.updateUserById(user.id, updateData);
        })
        .then(tokens => {
            resolve(tokens);
        })
        .catch(err => {
            reject({error: err.message});
        })

    });
}