const {
  getSmartphones,
  addSmartphones,
  deleteSmartphone,
} = require('@models/smartphones/smartphones.model');

const { validationResult } = require('express-validator');
const {
  checkProductName,
  checkProductPrice,
} = require('@models/products/products.validator');

async function httpGetSmartphones(req, res) {
  return res.status(200).json(await getSmartphones());
}

async function httpPostSmartphones(req, res) {
  try {
    await Promise.all([checkProductName(req), checkProductPrice(req)]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO: Make custom error object that receive array of error
      //throw validationResults.errors;
      errors.throw();
    } else {
      console.log('oke');
      const newSmartphone = await addSmartphones(req.body);
      return res.status(201).json(newSmartphone);
    }
  } catch (errors) {
    console.error(errors);
    return res.status(400).json(errors);
  }
}

async function httpDeleteSmartphone(req, res) {
  const { smartphoneId } = res.params;
}

module.exports = {
  httpGetSmartphones,
  httpPostSmartphones,
  httpDeleteSmartphone,
};
