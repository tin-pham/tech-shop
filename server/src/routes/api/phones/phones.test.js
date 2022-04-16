const path = require('path');
const request = require('supertest');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// More utils to work with Jest
const { toIncludeAllPartialMembers } = require('jest-extended');
expect.extend({ toIncludeAllPartialMembers });

const { getTestPhones } = require('@models/phones/phones.model');

// ENVIRONMENT VARIABLE HERE
require('dotenv').config({ path: path.resolve('env/.test.env') });
console.log(process.env.MONGO_URL);
const { mongoConnect, mongoDisconnect } = require('@services/mongo');
const app = require('@src/app');

describe('Launches products API', () => {
  const apiVer = 'v0.2';

  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe(`GET /api/${apiVer}/phones`, () => {
    test('It should response with 200 status code', async () => {
      await request(app)
        .get(`/api/${apiVer}/phones`)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe(`GET /api/${apiVer}/phones/?page=1&limit=2 and ?page=2&limit2`, () => {
    test('It should get the 2 page of request with two different object', async () => {
      const response1 = await request(app)
        .get(`/api/${apiVer}/phones/?page=1&limit=2`)
        .expect('Content-Type', /json/)
        .expect(200);

      const response2 = await request(app)
        .get(`/api/${apiVer}/phones/?page=2&limit2`)
        .expect('Content-Type', /json/)
        .expect(200);

      // If 2 page is the same => the pagination not work
      const page1 = response1.body;
      const page2 = response2.body;
      expect(page1).not.toStrictEqual(page2);
    });
  });

  describe(`POST /api/${apiVer}/phones`, () => {
    const phoneWithoutRequiredField = { test: true };
    const phoneWithInvalidField = {
      title: 'abc',
      price: 'abc',
      test: true,
    };
    const phone = {
      name: 'Vivo Y21 4GB + 64GB',
      description:
        'Dù sở hữu dung lượng pin lớn tới 5000mAh nhưng Y21 vẫn mang một thân máy mỏng nhẹ chỉ 8.0mm với thiết kế Khung Viền Phẳng 2.5D, mang đến cảm giác cầm nắm thoải mái và cao cấp.',
      category: ['smartphone'],
      brand: 'Vivo',
      variations: ['Trắng', 'Đen'],
      bundles: ['Điện thoai', 'Điện thoại + Sạc'],
      price: [3550000, 4000000],
      test: true,
    };

    test('It should catch error if required field is empty', async () => {
      const response = await request(app)
        .post(`/api/${apiVer}/phones`)
        .send(phoneWithoutRequiredField)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.errors).toIncludeAllPartialMembers([
        { msg: 'Tên sản phẩm không được để trống' },
        { msg: 'Giá sản phẩm không được để trống' },
      ]);
    });

    test('It should catch error if field is not valid', async () => {
      const response = await request(app)
        .post(`/api/${apiVer}/phones`)
        .send(phoneWithInvalidField)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.errors).toIncludeAllPartialMembers([
        { msg: 'Tên sản phẩm phải từ 5 đến 128 kí tự' },
        { msg: 'Giá sản phẩm phải là số' },
      ]);
    });

    test('It should created a new phone with 201 status code', async () => {
      const response = await request(app)
        .post(`/api/${apiVer}/phones`)
        .send(phone)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toMatchObject(phone);
    });
  });

  describe(`GET /api/${apiVer}/phones/:id`, () => {
    test('It should return all test phones', async () => {
      const testPhones = await getTestPhones();
      for (const phone of testPhones) {
        const response = await request(app)
          .get(`/api/${apiVer}/phones/${phone._id}`)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({ _id: ObjectId(phone._id) });
      }
    });
  });

  describe(`DELETE /api/${apiVer}/phones/:id`, () => {
    test('It should delete all test phones', async () => {
      const testPhones = await getTestPhones();
      for (let phone of testPhones) {
        const response = await request(app)
          .delete(`/api/${apiVer}/phones/${phone._id}`)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({ _id: ObjectId(phone._id) });
      }
    });
  });
});
