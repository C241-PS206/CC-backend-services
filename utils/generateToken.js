const jwt = require("jsonwebtoken");

function generateAccessToken(userPayload) {
    return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      algorithm: "HS256",  
      expiresIn: "60m",
    });
}

function generateRefreshToken(userPayload) {
    return jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET_KEY, {
        algorithm: "HS256",  
        expiresIn: "24h",
      });
}

module.exports = { generateAccessToken, generateRefreshToken };