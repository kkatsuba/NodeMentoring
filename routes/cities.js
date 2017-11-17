import express from 'express';
import { Cities } from '../models';
import { getRandomCityNative, getRandomCity } from '../data/mongo-native/cities';
import { insertModelMiddleware } from '../middlewares/insert-model';
const citiesRoute = new express.Router();

citiesRoute.get('/random', (req, res) => {
  const executable = req.query.native === true ? getRandomCityNative : getRandomCity;
  executable().then(cities => {
    res.json(cities);
  }).catch(err => {
    console.log(err);
    res.status(400).end('Failed load cities');
  });
});

citiesRoute.get('/', (req, res) => {

});

citiesRoute.post('/', (req, res, next) => {
  const city = new Cities(req.body);
  const error = city.validateSync();
  if (error) {
    res.status(400).send(error);
  }

  req.model = city;
  next();
}, insertModelMiddleware);

citiesRoute.put('/:id', (req, res) => {

});

citiesRoute.delete('/:id', (req, res) => {

});


export default citiesRoute;
