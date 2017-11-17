import express from 'express';
import productsRoute from './products';
import usersRoute from './users';
import citiesRoute from './cities';
const apiRoute = new express.Router();

apiRoute.use('/products', productsRoute);
apiRoute.use('/users', usersRoute);
apiRoute.use('/city', citiesRoute);

export default apiRoute;