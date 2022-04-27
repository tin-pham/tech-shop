const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  test: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.statics.login = async function({ username, password }) {
  const user = await this.findOne({ username });

  if (!user) {
    throw Error('Tên người dùng hoặc mật khẩu sai');
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error('Tên người dùng hoặc mật khẩu sai');
  }

  return user;
};

module.exports = mongoose.model('User', UserSchema);
