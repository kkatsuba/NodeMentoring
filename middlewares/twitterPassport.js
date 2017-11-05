import { Strategy } from 'passport-twitter';
import sha256 from 'sha256';
import users from '../mocks/users';
import config from '../config';

const port = process.env.PORT || 8080;

module.exports = (passport) => {
    passport.use('twitter', new Strategy({
        consumerKey: 'uL5yVkWJiHj2eufCiaCXBzsPi',
        consumerSecret: 'eXeUAZ1TeeX1OrFAwwsOfZkGUnyfmgWvEaAcR4g4QD25SuVQrZ',
        callbackURL: `${config.host}:${port}/auth/twitter/callback`
    }, (token, tokenSecret, profile, cb) => {
        return cb(null, {
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
        });
    }));
    
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
      
    passport.deserializeUser((id, cb) => {
        const user = users.find((user) => user.id === id);
        if (!user) {
            return cb(new Error('Not authenticated'));
        }
        return cb(null, user);
    });
};
