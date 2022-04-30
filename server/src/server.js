const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

require('module-alias')(path.join(__dirname, '..'));

require('dotenv').config({ path: path.resolve('src/config/.test.env') });

const { mongoConnect } = require('@services/mongo');
const Phone = require('@models/phones/phones.model');
const Review = require('@models/reviews/reviews.model');
const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
async function runServer() {
  await mongoConnect();
  await Phone.seedPhones();
  const phone = await Phone.getFirstPhone();
  await Review.seedReviewsToProduct(phone);

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

runServer();
