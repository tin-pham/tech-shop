const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Smartphones = require('./smartphones.mongo');

async function getAllSmartphones() {
  return await Smartphones.find({});
}

async function getSmartphoneById(id) {
  return await Smartphones.findOne({
    _id: ObjectId(id),
  });
}

async function addSmartphone(smartphone) {
  const { _id } = await Smartphones.create({
    title: smartphone.title,
    description: smartphone.description,
    brand: smartphone.brand,
    color: smartphone.color,
    price: smartphone.price,
  });

  return await getSmartphoneById(_id);
}

// TODO: add delete functionality
async function deleteSmartphone(id) {
  const smartphone = await getSmartphoneById(id);
  await Smartphones.deleteOne({ _id: id });

  return smartphone;
}

module.exports = {
  getAllSmartphones,
  getSmartphoneById,
  addSmartphone,
  deleteSmartphone,
};
