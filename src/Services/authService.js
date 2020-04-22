const {resolveError} = require('../Utils/ErrorUtils/errorResolver');
const tokenUtils = require('../Utils/Token/tokenUtils');
const userRepository = require('../Repositories/userRepository');

exports.refreshTokens = (resp, refreshToken) => {
    const data = tokenUtils.verifyToken(refreshToken);
    if (data) {
        const {email} = data;
        userRepository.findByEmail(email).then(
            user => {
                if (!user || user.refreshToken !== refreshToken) {
                    resp.status(200).json({error: "Invalid email or token"});
                }
                const updateTokens = {
                    accessToken: tokenUtils.getRefreshToken(user),
                    refreshToken: tokenUtils.getAccessToken(user)
                }
                userRepository.updateUserById(user.id, updateTokens)
                    .then(updatedRows => {
                            if (!updatedRows[0]) {
                                resp.status(200).json({error: "Failed "});
                            }
                            resp.status(201).json({
                                success: "OK",
                                accessToken: updateTokens.accessToken,
                                refreshToken: updateTokens.refreshToken
                            })
                                .catch(err => {
                                    resp.status(200).json(err);
                                });
                            resp.status(201).json(updateTokens);
                        }
                    ).catch(
                    err => {
                        resp.status(200).json({error: err});
                    }
                )
            })
    } else {
        resp.status(200).json({error: "Invalid refresh token"});
    }
}