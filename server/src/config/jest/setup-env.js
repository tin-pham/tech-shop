const path = require('path');

const dotenv = require('dotenv');

if (!process.env.GITHUB_ACTIONS) {
  dotenv.config({ path: path.resolve('src/config/.test.env') });
}
