import { Strategy } from 'passport-google-oauth20';
import sha256 from 'sha256';
import users from '../mocks/users';
import config from '../config';

const port = process.env.PORT || 8080;

// TODO this shit not work localy. need public domen
module.exports = (passport) => {
    passport.use('google', new Strategy({
        clientID: '1027609608166-sk2ud0t22khsen0m46j329u971ggp21d.apps.googleusercontent.com',
        consumerSecret: 'CAZE9Pkl5vEIz1pDPCKWvM4_',
        callbackURL: `${config.host}:${port}/auth/facebook/callback`
    }, (login, password, cb) => {
        const pswd = sha256(password);
        const user = users.find((user) => user.login === login && user.password === pswd);

        if (!user) {
            return cb(new Error('Not authenticated'));
        }

        return cb(null, user);
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
