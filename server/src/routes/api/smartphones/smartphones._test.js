const request = require('supertest');
const app = require('@src/app');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// More utils to work with Jest
const { toIncludeAllPartialMembers } = require('jest-extended');
expect.extend({ toIncludeAllPartialMembers });

const { getTestSmartphones } = require('@models/smartphones/smartphones.model');

const { mongoConnect, mongoDisconnect } = require('@services/mongo');

describe('Launches products API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('GET /api/v1/smartphones', () => {
    test('It should response with 200 status code', async () => {
      await request(app)
        .get('/api/v1/smartphones')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('GET /api/v1/smartphones/?page=1&limit=2 and ?page=2&limit2', () => {
    test('It should get the 2 page of request with two different object', async () => {
      const response1 = await request(app)
        .get('/api/v1/smartphones/?page=1&limit=2')
        .expect('Content-Type', /json/)
        .expect(200);

      const response2 = await request(app)
        .get('/api/v1/smartphones/?page=2&limit2')
        .expect('Content-Type', /json/)
        .expect(200);

      // If 2 page is the same => the pagination not work
      const page1 = response1.body;
      const page2 = response2.body;
      expect(page1).not.toStrictEqual(page2);
    });
  });

  describe('POST /api/v1/smartphones', () => {
    const smartphoneWithoutRequiredField = { test: true };
    const smartphoneWithInvalidField = {
      title: 'abc',
      price: 'abc',
      test: true,
    };
    const smartphone = {
      title: 'Vivo Y21 4GB + 64GB',
      description:
        'Dù sở hữu dung lượng pin lớn tới 5000mAh nhưng Y21 vẫn mang một thân máy mỏng nhẹ chỉ 8.0mm với thiết kế Khung Viền Phẳng 2.5D, mang đến cảm giác cầm nắm thoải mái và cao cấp.',
      brand: 'Vivo',
      color: 'Blue',
      price: 3550000,
      test: true,
    };

    test('It should catch error if required field is empty', async () => {
      const response = await request(app)
        .post('/api/v1/smartphones')
        .send(smartphoneWithoutRequiredField)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.errors).toIncludeAllPartialMembers([
        { msg: 'Tên sản phẩm không được để trống' },
        { msg: 'Giá sản phẩm không được để trống' },
      ]);
    });

    test('It should catch error if field is not valid', async () => {
      const response = await request(app)
        .post('/api/v1/smartphones')
        .send(smartphoneWithInvalidField)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.errors).toIncludeAllPartialMembers([
        { msg: 'Tên sản phẩm phải từ 5 đến 128 kí tự' },
        { msg: 'Giá sản phẩm phải là số' },
      ]);
    });

    test('It should created a new smartphone with 201 status code', async () => {
      const response = await request(app)
        .post('/api/v1/smartphones')
        .send(smartphone)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toMatchObject(smartphone);
    });
  });

  describe('GET /api/v1/smartphone/:id', () => {
    test('It should return all test smartphones', async () => {
      const testSmartphones = await getTestSmartphones();
      for (let smartphone of testSmartphones) {
        const response = await request(app)
          .get(`/api/v1/smartphones/${smartphone._id}`)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({ _id: ObjectId(smartphone._id) });
      }
    });
  });

  describe('DELETE /api/v1/smartphone/:id', () => {
    test('It should delete all test smartphones', async () => {
      const testSmartphones = await getTestSmartphones();
      for (let smartphone of testSmartphones) {
        const response = await request(app)
          .delete(`/api/v1/smartphones/${smartphone._id}`)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({ _id: ObjectId(smartphone._id) });
      }
    });
  });
});
