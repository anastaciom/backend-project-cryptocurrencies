const jwt = require('jsonwebtoken');
const {secret} = require('../config/authSecret')


const auth = async (req, res, next) => {

    const authHeader = req.headers.Authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token was not provided' })
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).json({ error: 'Token error' })
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token malformatted' })
    }

    jwt.verify(token, secret, (err, decoded)=>{
        if(err) {
            return res.status(401).json({ error: 'Token invalid' })
        }
     req.userId = decoded
     return next()
    })

}



module.exports = { auth }