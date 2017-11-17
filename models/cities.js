const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
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
});

module.exports = mongoose.model('Cities', citiesSchema);
