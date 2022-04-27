const request = require('supertest');

const app = require('@src/app');
const API_URL = `/api/${process.env.API_VERSION}/users`;

describe(`GET ${API_URL}`, () => {
  it('Should return all users with status code 200', async () =>{ 
    await request(app).get(API_URL)
    .expect('Content-Type', /json/)
    .expect(200);
  });
})

