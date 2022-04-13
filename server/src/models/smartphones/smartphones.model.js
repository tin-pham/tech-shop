const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Smartphones = require('./smartphones.mongo');

const { getPagination } = require('@services/query');

async function getAllSmartphones(query) {
  const { limit, skip } = getPagination(query);

  return await Smartphones.find({}, { __v: 0 }).skip(skip).limit(limit);
}

async function getSmartphoneById(id) {
  return await Smartphones.findOne({ _id: ObjectId(id) }, { __v: 0 });
}

async function addSmartphone(smartphone) {
  const { _id } = await Smartphones.create({
    title: smartphone.title,
    description: smartphone.description,
    brand: smartphone.brand,
    color: smartphone.color,
    price: smartphone.price,
    test: smartphone.test,
  });

  return await getSmartphoneById(_id);
}

// TODO: add delete functionality
async function deleteSmartphone(id) {
  const smartphone = await getSmartphoneById(id);
  await Smartphones.deleteOne({ _id: id });

  return smartphone;
}

async function getTestSmartphones() {
  return await Smartphones.find({ test: true });
}

module.exports = {
  getAllSmartphones,
  getSmartphoneById,
  addSmartphone,
  deleteSmartphone,
  getTestSmartphones,
};
