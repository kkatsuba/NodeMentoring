const mongoose = require('mongoose');
const Counters = require('./counters');

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

usersSchema.methods.getIndex = () => Counters.findOneAndUpdate({ _id: 'users_id' }, { $inc: { sequence_value: 1 } });

// mongoose just piece of shit. Does't support arrows in hooks.
usersSchema.pre('save', async function(next) {
  const user = this;
  const { sequence_value } = await user.getIndex();

  user.id = sequence_value;
  next();
});


const Users = mongoose.model('Users', usersSchema);

module.exports = Users;