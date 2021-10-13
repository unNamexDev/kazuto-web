const passport = require('passport');
const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(
    new Strategy({
        clientID: '756741387789271081',
        clientSecret: process.env.ClientSecret, 
        callbackURL: 'https://dashprueba.iloveyoumore.repl.co/login', 
        scope: ["identify", "guilds"]
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
             return done(null, profile)
        });
    })
);

module.exports = passport;