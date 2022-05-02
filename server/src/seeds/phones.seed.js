const Phone = require('@models/phones/phones.model');

module.exports = {
  async seedPhones() {
    await Phone.seedPhones();
  },
};
