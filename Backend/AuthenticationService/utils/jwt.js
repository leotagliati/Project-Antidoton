const jwt = require('jsonwebtoken');
const { JWT_SECRET, tokenExpiration } = require('../config/constants');

function createToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: tokenExpiration });
}

module.exports = { createToken };