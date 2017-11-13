import express from 'express';
import productsRoute from './products';
import usersRoute from './users';
const apiRoute = new express.Router();

apiRoute.use('/products', productsRoute);
apiRoute.use('/users', usersRoute);

export default apiRoute;