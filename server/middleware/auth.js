const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        let token = await req.header('Authorization');
        if (!token) {
            return res.status(403).send({ message: 'Access Denied' })
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verify;
        next()

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports =  verifyToken 