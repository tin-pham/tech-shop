const { mongoConnect, mongoDisconnect } = require('@services/mongo');

const { deleteAllTestUsers } = require('@models/users/users.model');
const Phone = require('@models/phones/phones.model');
const Review = require('@models/reviews/reviews.model');

beforeAll(async () => {
  await mongoConnect();
  await Phone.seedPhones();
  const phone = await Phone.getFirstPhone();
  await Review.seedReviewsToProduct(phone);
});

afterAll(async () => {
  await deleteAllTestUsers();
  await mongoDisconnect();
});
