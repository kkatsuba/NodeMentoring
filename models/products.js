const mongoose = require('mongoose');
const { getIndex, preSaveIndex} = require('./counters');

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: null
  },
  price: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

productsSchema.methods.getIndex = getIndex('products_id');
productsSchema.pre('save', preSaveIndex);

module.exports = mongoose.model('Products', productsSchema);
