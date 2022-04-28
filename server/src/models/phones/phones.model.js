const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Phones = require('./phones.mongo');
const { getPagination } = require('@services/query');
const { formatErrors, read } = require('@services/utils');

async function getAllPhones(query) {
  const { limit, skip } = getPagination({
    limit: query.limit,
    page: query.page,
  });

  const brandName = new RegExp(`${query.brand}`);

  const filter = {
    brand: { $regex: brandName, $options: 'i' },
    price: { $gte: query.priceFrom, $lte: query.priceTo },
    quantity: { $gte: query.quantity },
  };

  return await Phones.find(filter, { __v: 0 }).skip(skip).limit(limit);
}

async function getPhoneById(id) {
  return await Phones.findOne({ _id: ObjectId(id) }, { __v: 0 });
}

async function addPhone(phone) {
  try {
    const { _id } = await Phones.create(phone);
    return await getPhoneById(_id);
  } catch (errors) {
    throw formatErrors(errors);
  }
}
async function updatePhone(newPhone) {
  try {
    const phone = await Phones.findById(ObjectId(newPhone._id));
    Object.assign(phone, {
      _id: new ObjectId(newPhone._id),
      ...newPhone,
    });

    await phone.save();
    return phone;
  } catch (errors) {
    console.log(errors);
    throw formatErrors(errors);
  }
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

async function seedPhones() {
  await read(path.resolve('data/phones.json'), Phones);
}

module.exports = {
  getAllPhones,
  getPhoneById,
  addPhone,
  updatePhone,
  deletePhone,
  getTestPhones,
  seedPhones,
};
