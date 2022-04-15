const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { arrayNotEmpty } = require('@services/utils');

const phoneSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên sản phẩm'],
    minlength: [5, 'Tên sản phẩm phải có ít nhất 5 kí tự'],
  },
  category: {
    type: [String],
    validate: [arrayNotEmpty, 'Vui lòng nhập danh mục sản phẩm'],
  },
  description: String,
  brand: String,
  variations: [String],
  bundles: [String],
  quantity: Number,
  // TODO: Validate value must greater than 0
  price: {
    type: [Number],
    validate: [arrayNotEmpty, 'Vui lòng nhập giá sản phẩm'],
  },
  test: Boolean,
});

module.exports = mongoose.model('Phone', phoneSchema);
