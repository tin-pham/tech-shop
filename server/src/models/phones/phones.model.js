const path = require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const PhoneModel = require('./phones.mongo');
const phonesService = require('./phones.service');
const reviewsService = require('@models/reviews/reviews.service');
const { formatErrors, read } = require('@services/utils');

async function getFirstPhone() {
  return await PhoneModel.findOne({});
}

async function getAllPhones(query) {
  const { limit, skip } = phonesService.getPagination(query);
  const filter = phonesService.getFilter(query);

  if (query.reviews) {
    const reviewPagination = reviewsService.getPagination(query);
    return await PhoneModel.find(filter, { __v: 0 })
      .populate({
        path: 'reviews',
        options: {
          limit: reviewPagination.limit,
          skip: reviewPagination.skip,
        },
      })
      .skip(skip)
      .limit(limit);
  } else {
    return await PhoneModel.find(filter, { __v: 0 }).skip(skip).limit(limit);
  }
}

async function getPhoneById(id) {
  return await PhoneModel.findOne({ _id: ObjectId(id) }, { __v: 0 });
}

async function addPhone(phone) {
  try {
    const { _id } = await PhoneModel.create(phone);
    return await getPhoneById(_id);
  } catch (errors) {
    throw formatErrors(errors);
  }
}
async function updatePhone(newPhone) {
  try {
    const phone = await PhoneModel.findById(ObjectId(newPhone._id));
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
  await PhoneModel.deleteOne({ _id: id });

  return phone;
}

async function getTestPhones() {
  return await PhoneModel.find({ test: true });
}

async function seedPhones() {
  return read(path.resolve('data/phones.json'), function(phoneData) {
    return phoneData.map(async (phone) => {
      return PhoneModel.findOneAndUpdate({ _id: phone._id }, phone, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        omitUndefined: true,
      });
    });
  });
}

// async function addReviewToPhone(reviewData, phoneData) {
//   const phone = await PhoneModel.findOne({ _id: phoneData._id });

//   phone.reviews.push(reviewData);

//   await phone.save();

//   return phone;
// }

const Phone = {
  getFirstPhone,
  getAllPhones,
  getPhoneById,
  addPhone,
  updatePhone,
  deletePhone,
  getTestPhones,
  seedPhones,
};

module.exports = Phone;
