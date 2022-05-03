const {
  getAllPhones,
  getPhoneById,
  addPhone,
  updatePhone,
  deletePhone,
} = require('@models/phones/phones.model');

module.exports = {
  async httpGetAllPhones(req, res) {
    return res.status(200).json(await getAllPhones(req.query));
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

  async httpPutPhone(req, res) {
    try {
      const newPhone = await updatePhone({ _id: req.params.id, ...req.body });
      return res.status(200).json(newPhone);
    } catch (errors) {
      return res.status(400).json(errors);
    }
  },

  async httpDeletePhone(req, res) {
    const deletedPhone = await deletePhone(req.params.id);
    return res.status(200).json(deletedPhone);
  },
};
