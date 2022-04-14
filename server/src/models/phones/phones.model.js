const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Phones = require('./phones.mongo');

const { getPagination } = require('@services/query');

async function getAllPhones(query) {
  const { limit, skip } = getPagination(query);

  return await Phones.find({}, { __v: 0 }).skip(skip).limit(limit);
}

async function getPhoneById(id) {
  return await Phones.findOne({ _id: ObjectId(id) }, { __v: 0 });
}

async function addPhone(phone) {
  const { _id } = await Phones.create(phone);

  return await getPhoneById(_id);
}

// TODO: add delete functionality
async function deletePhone(id) {
  const phone = await getPhoneById(id);
  await Phones.deleteOne({ _id: id });

  return phone;
}

async function getTestPhones() {
  return await Phones.find({ test: true });
}

module.exports = {
  getAllPhones,
  getPhoneById,
  addPhone,
  deletePhone,
  getTestPhones,
};
