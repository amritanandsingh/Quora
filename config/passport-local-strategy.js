const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async function (email, password, done) {
        try {
            const user = await User.findOne({ email: email });
            if (!user || user.password !== password) {
                console.log("Invalid username/password");
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log("Error finding user in passport");
            return done(err);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log("Error finding user in passport -> deserializer");
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log("Error finding user in passport -> deserializer");
        return done(err);
    }
});

module.exports = passport;
