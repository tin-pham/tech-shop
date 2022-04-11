const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

require('module-alias')(path.join(__dirname, '..'));
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/products';

const server = http.createServer(app);
async function runServer() {
  await mongoose.connect(MONGO_URL);

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

runServer();
