const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên sản phẩm'],
    minlength: [4, 'Tên sản phẩm phải có ít nhất 4 kí tự'],
  },
  category: {
    type: String,
    required: [true, 'Vui lòng nhập danh mục sản phẩm'],
  },
  description: String,
  brand: String,
  variations: [String],
  bundles: [
    {
      name: String,
      price: Number,
    },
  ],
  quantity: Number,
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá sản phẩm'],
  },
  test: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Phone', phoneSchema);
