'use strict';
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

require('module-alias')(path.join(__dirname, '..'));

require('dotenv').config({ path: path.resolve('src/config/.env') });

const { mongoConnect } = require('@services/mongo');
// const Phone = require('@models/phones/phones.model');
// const Review = require('@models/reviews/reviews.model');

const { seedPhones } = require('@seeds/phones.seed');
const { seedReviews } = require('@seeds/reviews.seed');
const { seedUsers } = require('@seeds/users.seed');
const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
async function runServer() {
  await mongoConnect();

  await seedPhones();
  await seedReviews();
  await seedUsers();
  //await seedReviews();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

runServer();
