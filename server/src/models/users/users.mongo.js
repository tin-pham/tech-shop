const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Tên đăng nhập không được để trống'],
    unique: true,
    minlength: [6, 'Tên đăng nhập phải có ít nhất 6 kí tự'],
    maxlength: [30, 'Tên đăng nhập có nhiều nhất 30 kí tự'],
  },
  password: {
    type: String,
    required: [true, 'Mật khẩu không được để trống'],
    minlength: [8, 'Mật khẩu phải có ít nhất 8 kí tự'],
  },
  name: String,
  addresses: [String],
});

module.exports = mongoose.model('User', UsersSchema);
