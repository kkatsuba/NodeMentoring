import { Strategy } from 'passport-local';
import sha256 from 'sha256';
import users from '../mocks/users';

module.exports = (passport) => {
    passport.use('local-signup', new Strategy({
        usernameField: 'login',
        passwordField: 'password',
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
