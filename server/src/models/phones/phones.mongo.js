const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  description: String,
  brand: String,
  variations: [String],
  bundles: [String],
  quantity: Number,
  price: {
    type: [Number],
    required: true,
  },
  test: Boolean,
});

module.exports = mongoose.model('Phone', phoneSchema);
