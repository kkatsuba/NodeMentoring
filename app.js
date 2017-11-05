import express from 'express';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';

const app = express();
const apiRoute = new express.Router();
app.use(cookieParser);
app.use(queryParser);
app.use('/api', apiRoute);

app.get('/', function (req, res) {
    res.json({
        cookies: req.parsedCookie,
        query: req.parsedQuery
    });
});

apiRoute.get('/products', (req, res) => {
    res.json([{
        id: 1,
        name: '12',
    }, {
        id: 2,
        name: '1231'
    }]);
});

apiRoute.get('/products/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: '1231'
    });
});

apiRoute.get('/products/:id/reviews', (req, res) => {
    res.json([]);
});

apiRoute.post('/products', (req, res) => {
    res.json({
        status: 'success',
        id: Math.random() * 10000
    });
});

apiRoute.get('/users', (req, res) => {
    res.json([{
        id: 1,
        name: '12',
    }, {
        id: 2,
        name: '1231'
    }]);
});

export default app;