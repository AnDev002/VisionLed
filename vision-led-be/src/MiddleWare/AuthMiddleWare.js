const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authentication'
            })
        }
        if(user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authentication'
            })
        }
    })
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userID = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authentication'
            })
        }
        if(user?.isAdmin || user?.id === userID) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authentication'
            })
        }
    })
}

const verifyToken = async (req, res, next) => {
    const token = req.headers.authentication
    if(!token) {
        res.status(401).json({
            err: 1,
            msg: "isn't logged in"
        })
    }
    await jwt.verify(token, 'hip06', (err, decode) => {
        if(err) {
            res.status(402).json({
                err: 2,
                msg: "invalid token"
            })
        }
        req.currentUser = decode
        next()
    })
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    verifyToken
}