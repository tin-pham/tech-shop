const request = require('supertest');
const app = require('@src/app');

describe('Auth start', () => {
  const API_VERSION = process.env.API_VERSION;
  const API_SIGNUP = `/api/${API_VERSION}/signup`;
  const API_LOGIN = `/api/${API_VERSION}/login`;
  describe(`POST ${API_LOGIN}`, () => {
    const userWithInvalidField = {
      username: 'i',
      password: ':v',
      test: true,
    };
    const userWithoutField = {
      test: true,
    };
    const user = {
      username: 'testing',
      password: 'test12345',
      test: true,
    };
    it('Should catch error if required field was empty', async () => {
      const response = await request(app)
        .post(API_SIGNUP)
        .send(userWithoutField)
        .expect('Content-Type', /json/)
        .expect(400);

      const errors = response.body;
      expect(errors).toMatchObject({
        username: 'Tên đăng nhập không được để trống',
        password: 'Mật khẩu không được để trống',
      });
    });

    it('Should catch error if input was invalid', async () => {
      const response = await request(app)
        .post(API_SIGNUP)
        .send(userWithInvalidField)
        .expect('Content-Type', /json/)
        .expect(400);

      const errors = response.body;
      expect(errors).toMatchObject({
        username: 'Tên đăng nhập phải có ít nhất 6 kí tự',
        password: 'Mật khẩu phải có ít nhất 8 kí tự',
      });
    });
    it('Should create a user with 201 status code', async () => {
      const response = await request(app)
        .post(API_SIGNUP)
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201);

      const newUser = response.body;

      expect(newUser.username).toBe(user.username);
    });
  });
});
