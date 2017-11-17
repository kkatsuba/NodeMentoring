const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config.json');
const Cities = require('../../models/index').Cities;

const connectionString = config.database.connection;
const getConnectionNative = () => MongoClient.connect(connectionString);

const getRandomCityNative = async () => {
  const db = await getConnectionNative();
  const randomCity = await db.collection('cities').aggregate(
    [{ $sample: { size: 1 } }]
  ).next();

  db.close();
  return randomCity;
};

const getRandomCity = async () => Cities.aggregate([
  { $sample: { size: 1 } }
]);

const insertManyCitiesWithRemove = async (cities) => {
  try {
    const db = await getConnectionNative();
    await db.collection('cities').remove();
    const data = await db.collection('cities').insertMany(cities);

    db.close();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

module.exports = {
  getRandomCityNative,
  getRandomCity,
  insertManyCitiesWithRemove
};
