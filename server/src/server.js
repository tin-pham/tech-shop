const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

require('module-alias')(path.join(__dirname, '..'));
require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('@utils/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
async function runServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

runServer();
