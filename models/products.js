const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: String,
  brand: String,
  company: String,
  price: String,
  isbn: String,
});

module.exports = mongoose.model('Products', productsSchema);