const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { getPagination } = require('@services/query');
const Users = require('./users.mongo');
const { formatErrors } = require('@services/utils');

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

module.exports = {
  getAllUsers,
  createUser,
};
