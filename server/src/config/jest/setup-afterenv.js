const { mongoConnect, mongoDisconnect } = require('@services/mongo');

const { deleteAllTestUsers } = require('@models/users/users.model');

beforeAll(async () => {
  await mongoConnect();
});

afterAll(async () => {
  await deleteAllTestUsers();
  await mongoDisconnect();
});
