const path = require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Users = require('./users.mongo');
const { getPagination } = require('@services/query');
const { formatErrors, read } = require('@services/utils');

async function getAllUsers(query) {
  const { skip, limit } = getPagination(query);
  return await Users.find({}, { __v: 0 }).skip(skip).limit(limit);
}

async function createUser(user) {
  try {
    const newUser = await Users.create(user);
    return newUser;
  } catch (errors) {
    const formatedErrors = formatErrors(errors);
    throw formatedErrors;
  }
}

async function deleteAllTestUsers() {
  try {
    const result = await Users.deleteMany({ test: true });
    return result;
  } catch (errors) {
    return errors;
  }
}

async function seedUsers() {
  await read(path.resolve('data/users.json'));
}

module.exports = {
  getAllUsers,
  createUser,
  deleteAllTestUsers,
  seedUsers,
};
