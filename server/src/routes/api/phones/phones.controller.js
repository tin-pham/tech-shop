const {
  getAllPhones,
  getPhoneById,
  addPhone,
  deletePhone,
} = require('@models/phones/phones.model');

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
      const newPhone = await addPhone(req.body);
      return res.status(201).json(newPhone);
    } catch (errors) {
      return res.status(400).json(errors);
    }
  },

  async httpDeletePhone(req, res) {
    const deletedPhone = await deletePhone(req.params.id);
    return res.status(200).json(deletedPhone);
  },
};
