const { mongoConnect, mongoDisconnect } = require('@services/mongo');

const { deleteAllTestUsers } = require('@models/users/users.model');

beforeAll(async () => {
  console.log(process.env.MONGO_URL);
  await mongoConnect();
}, 30000);

afterAll(async () => {
  await deleteAllTestUsers();
  await mongoDisconnect();
}, 30000);
