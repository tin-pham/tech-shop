const {
  getAllSmartphones,
  getSmartphoneById,
  addSmartphone,
  deleteSmartphone,
} = require('@models/smartphones/smartphones.model');

const { validationResult } = require('express-validator');

const {
  checkProductName,
  checkProductPrice,
} = require('@models/products/products.validator');

module.exports = {
  async httpGetAllSmartphones(req, res) {
    return res.status(200).json(await getAllSmartphones());
  },

  async httpGetSmartphone(req, res) {
    return res.status(200).json(await getSmartphoneById(req.params.id));
  },

  async httpPostSmartphone(req, res) {
    try {
      await Promise.all([checkProductName(req), checkProductPrice(req)]);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.throw();
      } else {
        const newSmartphone = await addSmartphone(req.body);
        return res.status(201).json(newSmartphone);
      }
    } catch (errors) {
      console.error(errors);
      return res.status(400).json(errors);
    }
  },

  async httpDeleteSmartphone(req, res) {
    const deletedSmartphone = await deleteSmartphone(req.params.id);
    return res.status(200).json(deletedSmartphone);
  },
};
