const express = require("express");
const authController = require("../Controllers/market/authController");
const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/refreshTokens",authController.refreshTokens);

module.exports = authRouter;