const { mongoConnect, mongoDisconnect } = require('@services/mongo');

const { deleteAllTestUsers } = require('@models/users/users.model');
const { seedPhones } = require('@seeds/phones.seed');
const { seedReviews } = require('@seeds/reviews.seed');
const { seedUsers } = require('@seeds/users.seed');

beforeAll(async () => {
  await mongoConnect();

  await seedPhones();
  await seedReviews();
  await seedUsers();
});

afterAll(async () => {
  await deleteAllTestUsers();
  await mongoDisconnect();
});
