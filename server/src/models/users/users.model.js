const path = require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const UserModel = require('./users.mongo');
const { getPagination } = require('@services/query');
const { formatErrors, read } = require('@services/utils');

async function getAllUsers(query) {
  const { skip, limit } = getPagination(query);
  return await UserModel.find({}, { __v: 0 }).skip(skip).limit(limit);
}

async function getOneWith(filter) {
  return await UserModel.find({ filter }, { __v: 0 });
}

async function createUser(user) {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (errors) {
    const formatedErrors = formatErrors(errors);
    throw formatedErrors;
  }
}

async function deleteAllTestUsers() {
  try {
    const result = await UserModel.deleteMany({ test: true });
    return result;
  } catch (errors) {
    return errors;
  }
}

async function upsertUser(user) {
  try {
    return await UserModel.findOneAndUpdate({ _id: user._id }, user, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      omitUndefined: true
    });
  } catch (errors) {
    return errors;
  }
}

async function seedUsers() {
  return read(path.resolve('data/users.json'), (userData) => {
    return userData.map((user) => {
      return upsertUser(user);
    });
  });
}

module.exports = {
  getAllUsers,
  getOneWith,
  createUser,
  deleteAllTestUsers,
  seedUsers,
};
