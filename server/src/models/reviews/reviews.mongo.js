const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Vui lòng nhập nội dung đánh giá'],
    minlength: [4, 'Đánh giá phải có ít nhất 4 kí tự'],
  },
  rating: {
    type: Number,
    required: [true, 'Vui lòng nhập số sao bạn muốn đánh giá'],
    min: [1, 'Đánh giá phải có ít nhất phải có 1 sao'],
    max: [5, 'Đánh giá phải có nhiều nhất phải có 5 sao'],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'Đánh giá phải có người đánh giá'],
    ref: 'User',
  },
  product: {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Vui lòng nhập sản phẩm cần đánh giá'],
      refPath: 'model',
    },
    model: {
      type: String,
      required: [true, 'Vui lòng nhập loại sản phẩm cần đánh giá'],
      enum: ['Phone'],
    },
  },
});

module.exports = mongoose.model('Review', reviewSchema);
