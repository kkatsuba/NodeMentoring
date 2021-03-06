const mongoose = require('mongoose');
const sha256 = require('crypto-js/sha256');
const { getIndex, preSaveIndex } = require('./counters');

const usersSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Wrong email']
  },
  password: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

usersSchema.methods.getIndex = getIndex('users_id');
usersSchema.pre('save', preSaveIndex);
usersSchema.pre('save', function (next) {
  const user = this;

  user.password = sha256(`urGenT!!${user.pawword}SesuriTYYY!wArNiNG`).toString();
  next()
});

module.exports = mongoose.model('Users', usersSchema);
