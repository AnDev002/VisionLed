const passport = require('passport');
const User = require('./Models/User');
const { v4: uuidv4 } = require('uuid');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${URL_SERVER}/api/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            if (profile.id) {
                const checkUser = await User.findOne({
                    emailId: profile.id
                });
                
                console.log("profile.id = ", profile.id)
                if (!checkUser) {
                    await User.create({
                        emailId: profile.id,
                        email: profile.emails[0]?.value,
                        name: profile.displayName,
                        avatar: profile.photos[0]?.value,
                        typeLogin: profile?.provider,
                    })
                } else {
                    await User.findByIdAndUpdate(checkUser._id, { new: true })
                }
            }
        } catch (error) {
            console.log(error);
        }
        return cb(null, profile);
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${URL_SERVER}/api/auth/facebook/callback`,
    profileFields: ['id', 'email', 'photos', 'name', 'displayName'],
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            if (profile?.id) {
                const checkUser = await User.findOne({
                    facebookId: profile.id
                });

                if (!checkUser) {
                    await User.create({
                        facebookId: profile.id,
                        facebook: "",
                        email: profile.emails[0].value ? profile.emails[0].value : null,
                        name: profile.displayName,
                        typeLogin: profile?.provider,
                        avatar: profile.photos[0].value ? profile.photos[0].value : null,
                    })
                } else {
                    await User.findByIdAndUpdate(checkUser._id, { new: true })
                }
            }
        } catch (error) {
            console.log(error);
        }
        return cb(null, profile);
    }
));
