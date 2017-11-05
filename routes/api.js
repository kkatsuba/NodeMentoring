import express from 'express';
const apiRoute = new express.Router();

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

export default apiRoute;