const mongoose = require('mongoose');
const connect = require('./connection');
const { insertManyCitiesWithRemove } = require('./mongo-native/cities');
const {
  insertManyCountersWithRemove,
  insertManyProductsWithRemove,
  insertManyUsersWithRemove
} = require('./inserts');

const performMockInsert = () => Promise.all([
  insertManyCitiesWithRemove(require('./mocks/cities.json')),
  insertManyUsersWithRemove(require('./mocks/users')),
  insertManyProductsWithRemove(require('./mocks/products.json')),
  insertManyCountersWithRemove(require('./mocks/counters.json'))
]);

connect()
  .then(performMockInsert)
  .then(() => {
    console.log('All queries done');

    mongoose.connection.close();
  })
  .catch(err => {
    mongoose.connection.close();
    console.log('!!?', err);
  });
