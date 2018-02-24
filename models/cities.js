const mongoose = require('mongoose');
const { getIndex, preSaveIndex } = require('./counters');

const citiesSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  capital: {
    type: Boolean,
    default: false
  },
  location: {
    lat: {
      type: Number,
      default: 0
    },
    long: {
      type: Number,
      default: 0
    }
  }
}, {
  versionKey: false
});

citiesSchema.methods.getIndex = getIndex('cities_id');
citiesSchema.pre('save', preSaveIndex);

module.exports = mongoose.model('Cities', citiesSchema);
