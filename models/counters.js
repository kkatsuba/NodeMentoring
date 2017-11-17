const mongoose = require('mongoose');

const countersSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number,
});

module.exports = mongoose.model('Counters', countersSchema);