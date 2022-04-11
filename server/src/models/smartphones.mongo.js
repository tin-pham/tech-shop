const mongoose = require('mongoose');

const smartphone = {
  id: '15401',
  title: 'Iphone 13 Pro Max 256GB',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique enim et fringilla tincidunt. Proin ac mi mauris. Aliquam et hendrerit felis, vitae tempus turpis. Aenean luctus, risus eget maximus convallis, augue felis viverra ligula, eget tincidunt lacus lectus a risus. Maecenas laoreet id magna at fringilla',
  brand: 'Apple',
  color: 'Gold',
  price: '36.990.000',
};
const smartphonesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  brand: String,
  color: String,
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Smartphone', smartphonesSchema);
