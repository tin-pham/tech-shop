const fs = require('fs');
const path = require('path');
const { EJSON } = require('bson');

// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

function formatErrors(validationResult) {
  const errors = {};

  // properties:
  // {
  //   validator: [Function (anonymous)],
  //   message: 'Tên đăng nhập không được để trống',
  //   type: 'required',
  //   path: 'username',
  //   value: ''
  // }

  Object.values(validationResult.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return errors;
}

function arrayNotEmpty(item) {
  return Array.isArray(item) && item.length > 0;
}

async function read(filename, callback) {
  const readableStream = fs.createReadStream(filename);

  readableStream.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  readableStream.on('data', async (chunk) => {
    try {
      const data = EJSON.parse(chunk.toString());

      let promiseData = callback(data);

      const newData = await Promise.all(promiseData);
      console.log('Insert data successfully');
      return newData;
    } catch (errors) {
      console.error(errors);
      return errors;
    }
  });
}

module.exports = {
  formatErrors,
  arrayNotEmpty,
  read,
};
