import { Strategy } from 'passport-facebook';
import sha256 from 'sha256';
import users from '../mocks/users';
import config from '../config';

const port = process.env.PORT || 8080;

// TODO this shit not work localy. need deployment
module.exports = (passport) => {
    passport.use('facebook', new Strategy({
        clientID: '420789141615081',
        clientSecret: '25ef8ca345956789934d2224be29a750',
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
