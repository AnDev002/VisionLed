const express = require("express")
const router = express.Router()
require("dotenv").config()
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location', 'public_profile' ]}));
router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.provider}/${req.user?.id}`)
})

module.exports = router