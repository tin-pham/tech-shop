const {
  getSmartphones,
  addSmartphones,
  deleteSmartphone,
} = require('@models/smartphones/smartphones.model');

async function httpGetSmartphones(req, res) {
  return res.status(200).json(await getSmartphones());
}

async function httpPostSmartphones(req, res) {
  const newSmartphone = await addSmartphones(req.body);
  return res.status(201).json(newSmartphone);
}

async function httpDeleteSmartphone(req, res) {
  const { smartphoneId } = res.params;
}

module.exports = {
  httpGetSmartphones,
  httpPostSmartphones,
  httpDeleteSmartphone,
};
