const { check } = require('express-validator');

module.exports = {
  checkProductName(req) {
    return check('title')
      .trim()
      .notEmpty()
      .withMessage('Tên sản phẩm không được để trống')
      .isLength({ min: 5, max: 128 })
      .withMessage('Tên sản phẩm phải từ 5 đến 128 kí tự')
      .run(req);
  },
  checkProductPrice(req) {
    return check('price')
      .isNumeric()
      .withMessage('Giá sản phẩm phải là số')
      .run(req);
  },
};
