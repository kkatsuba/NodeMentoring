import { Cities } from '../models/index';
import { getRandomCityNative, getRandomCityMongoose } from '../data/mongo-native/cities';

const getRandomCity = (req, res) => {
  const executable = req.query.native ? getRandomCityNative : getRandomCityMongoose;
  executable().then(cities => {
    res.json(cities[0]);
  }).catch(err => {
    console.log(err);
    res.status(400).end('Failed load cities');
  });
};

const getCityById = (req, res, next) => {
  req.model = Cities;
  next();
};

const saveNewCity = (req, res, next) => {
  req.model = new Cities(req.body);
  next();
};

const updateCityById = (req, res) => {
  const id = req.params.id;

  // I will not save new. just because it stupid to save with predefined id.
  // May be i noob ¯\_(ツ)_/¯.
  // And what will happened when sequence goes to this id? Save failure.
  // for enable this used upsert: true
  Cities
    .findOneAndUpdate({ id }, req.body, { new: true })
    .exec()
    .then(city => res.json(city))
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const deleteCityById = (req, res, next) => {
  req.model = Cities;
  next();
};

export default {
  getRandomCity,
  getCityById,
  saveNewCity,
  updateCityById,
  deleteCityById
};
