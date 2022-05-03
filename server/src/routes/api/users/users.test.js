const request = require('supertest');

const app = require('@src/app');
const API_URL = `/api/${process.env.API_VERSION}/users`;

let token = '';
beforeAll(async () => {
  const response = await request(app)
    .post(`/api/${process.env.API_VERSION}/login`)
    .send({
      username: 'testing111',
      password: 'testing111',
    });

  token = response.body.token;
});

describe(`GET ${API_URL}`, () => {
  it('Should return all users with status code 200', async () => {
    await request(app)
      .get(API_URL)
      .set('Cookie', `jwt=${token};`)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
