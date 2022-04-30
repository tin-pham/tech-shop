const request = require('supertest');
const app = require('@src/app');

const API_URL = `/api/${process.env.API_VERSION}`;

describe(`GET ${API_URL}/reviews`, () => {
  it('Should directly get reviews with status code 200', async () => {
    await request(app)
      .get(API_URL + '/reviews')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe(`GET ${API_URL}/?limit=1&reviews=true`, () => {
  it('Should return 10 reviews inside a phones by default with status code 200', async () => {
    const response = await request(app)
      .get(API_URL + '/phones?reviews=true')
      .expect('Content-Type', /json/)
      .expect(200);

    const { reviews } = response.body[0];
    expect(reviews.length).toBe(10);
  });

  // it('Should return 2 reviews page', async () => {
  //   const response1 = await request(app)
  //     .get(API_URL + '/phones?reviews=true&reviewsPage=1&reviewsLimit=2')
  //     .expect('Content-Type', /json/)
  //     .expect(200);

  //   const response2 = await request(app)
  //     .get(API_URL + '/phones?reviews=true&reviewsPage=2&reviewsLimit=2')
  //     .expect('Content-Type', /json/)
  //     .expect(200);

  //   const reviews1 = response1.body
  //   const reviews2 = response2.body.reviews;

  //   expect(reviews1).not.toStrictEqual(reviews2);
  // });
});
