const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid!');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decode.userId, name: decode.name };
        next();
    } catch (error) { 
        throw new UnauthenticatedError('Authenticatin invalid!');
    }

}

module.exports = auth