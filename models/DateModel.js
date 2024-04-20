const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: false,
    unique: true
  },
  price: {
    type: Number,
  },
  booked: {
    type: Boolean,
    default: false
  }
});

const DateModel = mongoose.model('Date', dateSchema);

module.exports = DateModel;
