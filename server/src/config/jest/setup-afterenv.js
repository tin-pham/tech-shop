const { mongoConnect, mongoDisconnect} = require('@services/mongo');

beforeAll(async () => {
  await mongoConnect();
})

afterAll(async () => {
  await mongoDisconnect();
})
