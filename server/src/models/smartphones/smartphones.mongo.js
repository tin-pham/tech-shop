const mongoose = require('mongoose');

const smartphonesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  brand: String,
  color: String,
  price: {
    type: Number,
    required: true,
  },
  test: Boolean,
});

module.exports = mongoose.model('Smartphone', smartphonesSchema);
