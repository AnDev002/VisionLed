const express = require("express")
const router = express.Router()
require("dotenv").config()
const passport = require('passport')
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile
        console.log(profile)
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.provider}/${req.user?.id}`)
})


module.exports = router