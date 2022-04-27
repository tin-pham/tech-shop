const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once('open', () => {
  console.log('MongoDB conection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

module.exports = {
  async mongoConnect() {
    await mongoose.connect(MONGO_URL);
  },

  async mongoDisconnect() {
    await mongoose.disconnect();
  },
};
