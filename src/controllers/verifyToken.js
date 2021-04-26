const jwt = require('jsonwebtoken')
const config = require('./../config')

function verifyToken(req, res, next) {
    const access_token = req.headers['x-access-token'];
    if (!access_token) {
        return res.status(401).json(({
            ok: false,
            messagge : 'No token auth'
        })
    )}

    const decoded = jwt.verify(access_token, config.secret)
    req.userId = decoded.id
    next()
}

module.exports = verifyToken 