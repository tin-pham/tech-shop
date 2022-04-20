const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

require('module-alias')(path.join(__dirname, '..'));

require('dotenv').config({ path: path.resolve('src/config/.test.env') });

const { mongoConnect } = require('@services/mongo');
const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
async function runServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

runServer();
