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

module.exports = {
  formatErrors,
};
