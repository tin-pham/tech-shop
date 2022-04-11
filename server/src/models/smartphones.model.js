const Smartphones = require('./smartphones.mongo');

async function getSmartphones() {
  return await Smartphones.find({});
}

async function getSmartphonesById(id) {
  return await Smartphones.find({
    _id: id,
  });
}

async function addSmartphones(smartphone) {
  const { _id } = await Smartphones.create({
    title: smartphone.title,
    description: smartphone.description,
    brand: smartphone.brand,
    color: smartphone.color,
    price: smartphone.price,
  });

  return await getSmartphonesById(_id);
}

// TODO: add delete functionality
async function deleteSmartphone(id) { }

module.exports = {
  getSmartphones,
  addSmartphones,
  deleteSmartphone,
};
