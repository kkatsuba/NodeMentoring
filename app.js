import express from 'express';
import cookieParser from 'cookie-parser';
import apiRoute from './routes/api';
import auth from './routes/auth';
import authMiddleware from './middlewares/auth';
import passport from 'passport';
import session from 'express-session';
require('./middlewares/localPassport')(passport); // local
require('./middlewares/facebookPassport')(passport);
require('./middlewares/twitterPassport')(passport);
require('./middlewares/googlePasswort')(passport);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'just_sesurity',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authMiddleware, apiRoute);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.json({
        cookies: req.parsedCookie,
        query: req.parsedQuery
    });
});

app.get('/error', (req, res) => {
    res.status(503).json({
        message: 'Service error'
    });
});

export default app;