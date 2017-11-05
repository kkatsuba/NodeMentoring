import express from 'express';
import users from '../mocks/users';
import sha256 from 'sha256';
import jwt from 'jsonwebtoken';
import config from '../config';
import passport from 'passport';

const auth = new express.Router();

auth.post('/', passport.authenticate('local-signup'), (req, res) => {
    req.accepts('application/json');
    
    if (!req.body || !req.body.password || !req.body.login) {
        res.status(400).end();
        return;
    }

    const password = sha256(req.body.password);
    const login = req.body.login;
    const user = users.find((user) => user.login === login && user.password === password);
    if (!user) {
        res.status(404).json({
            status: '404',
            message: 'Not found'
        });
        return;
    }

    const response = {
        email: user.email,
        login: user.login
    };

    res.json({
        status: 200,
        message: 'OK',
        data: response,
        token: jwt.sign(response, config.secretKey, {
            expiresIn: '1h'
        })
    });
});

auth.get('/facebook', passport.authenticate('facebook'));
auth.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/error' }),
    (req, res) => {
        res.status(200).send('Success');
    }
);

auth.get('/twitter', passport.authenticate('twitter'));
auth.get('/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/error' }),
    (req, res) => {
        res.status(200).send('Success');
    }
);

auth.get('/google', passport.authenticate('google', { scope: ['profile'] }));
auth.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    (req, res) => {
        res.status(200).send('Success');
    }
);

export default auth;