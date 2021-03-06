const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smartphonesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  brand: String,
  options: [String],
  price: {
    type: [Number],
    required: true,
  },
  test: Boolean,
});

module.exports = mongoose.model('Smartphone', smartphonesSchema);
