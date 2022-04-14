const {
  getAllPhones,
  getPhoneById,
  addPhone,
  deletePhone,
} = require('@models/phones/phones.model');

const { validationResult } = require('express-validator');

const {
  checkProductName,
  checkProductPrice,
} = require('@models/products/products.validator');

module.exports = {
  async httpGetAllPhones(req, res) {
    const { page, limit } = req.query;
    return res.status(200).json(await getAllPhones({ page, limit }));
  },

  async httpGetPhone(req, res) {
    return res.status(200).json(await getPhoneById(req.params.id));
  },

  async httpPostPhone(req, res) {
    try {
      await Promise.all([checkProductName(req), checkProductPrice(req)]);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.throw();
      } else {
        const newPhone = await addPhone(req.body);
        return res.status(201).json(newPhone);
      }
    } catch (errors) {
      return res.status(400).json(errors);
    }
  },

  async httpDeletePhone(req, res) {
    const deletedPhone = await deletePhone(req.params.id);
    return res.status(200).json(deletedPhone);
  },
};
