import express from 'express';
import * as data from '../data-access/products';

const productsRoute = new express.Router();

productsRoute.get('/', (req, res) => {
    data.getAllProducts().then(products => {
        res.json(products);
    }).catch(err => {
        res.status(400).end('Failed load products');
    });
});

/*
    Payload example:
    {
        "data": {
            "name": "smth",
            "brand": "nice_ brand",
            "company": "hz",
            "price": "qweq",
            "isbn": "adqq"
        }
    }
 */
productsRoute.post('/', async (req, res) => {
    try {
        const product = await data.createNewProduct(req.body.data);
        res.json(product);
    } catch (ex) {
        let message = '';
        if (ex.name && ex.name === 'SequelizeValidationError') {
            message = ex.errors.reduce((res, cur) => `${res}${cur.message}\n`, '');
        } else {
            message = ex.message;
        }
        res.status(400).end(message);
    }
});

productsRoute.get('/:id', (req, res) => {
    data.getProductById(req.params.id).then(product => {
        res.json(product);
    }).catch(err => {
        res.status(400).end('Failed load product');
    });
});

productsRoute.get('/:id/reviews', (req, res) => {
    data.getProductReviews(req.param.id).then(product => {
        res.json(product);
    }).catch(err => {
        res.status(400).end('Failed load product');
    });
});

export default productsRoute;