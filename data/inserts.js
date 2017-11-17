const { Products, Users, Cities, Counters } = require('../models');

const insertManyProductsWithRemove = async (products) => {
  await Products.collection.remove();
  return Products.collection.insertMany(products);
};

const insertManyUsersWithRemove = async (users) => {
  Users.collection.remove();
  return Users.collection.insertMany(users);
};

const insertManyCountersWithRemove = async (counters) => {
  await Counters.collection.remove();
  return Counters.collection.insertMany(counters);
};

module.exports = {
  insertManyProductsWithRemove,
  insertManyUsersWithRemove,
  insertManyCountersWithRemove
};
