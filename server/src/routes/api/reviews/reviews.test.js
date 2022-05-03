const request = require('supertest');
const app = require('@src/app');

const API_URL = `/api/${process.env.API_VERSION}`;

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

describe(`Reviews testing`, () => {
  describe(`GET ${API_URL}/reviews`, () => {
    it('Should directly get reviews with status code 200', async () => {
      await request(app)
        .get(API_URL + '/reviews')
        .set('Cookie', [`jwt=${token};`])
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe(`GET ${API_URL}/?reviews=true`, () => {
    it('Should return 10 reviews inside a phones by default with status code 200', async () => {
      const response = await request(app)
        .get(API_URL + '/phones?reviews=true')
        .set('Cookie', [`jwt=${token};`])
        .expect('Content-Type', /json/)
        .expect(200);

      const { reviews } = response.body[0];
      expect(reviews.length).toBe(10);
    });
  });
});
