import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
    if (!req.query.auth) {
        res.status(400).json({ message: 'Buugggaaa!' });
        return;
    }

    jwt.verify(req.query.auth, config.secretKey, (err, decoded) => {
        if (err) {
            res.status(400).json({ message: 'Buugggaaa!' });
            return;
        }

        req.user = decoded;
        next();
    });
    
    next();
};