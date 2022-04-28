const path = require('path');
const request = require('supertest');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// More utils to work with Jest
const {
  toIncludeAllPartialMembers,
  toContainValues,
} = require('jest-extended');
expect.extend({ toIncludeAllPartialMembers, toContainValues });

const { getTestPhones } = require('@models/phones/phones.model');

// ENVIRONMENT VARIABLE HERE
// require('dotenv').config({ path: path.resolve('src/config/.test.env') });
const app = require('@src/app');

describe('Launches products API', () => {
  const API_URL = `/api/${process.env.API_VERSION}/phones`;

  // beforeAll(async () => {
  //   await mongoConnect();
  // });

  // afterAll(async () => {
  //   await mongoDisconnect();
  // });

  describe(`GET ${API_URL}`, () => {
    it('Should response with 200 status code', async () => {
      await request(app)
        .get(API_URL)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe(`GET ${API_URL}/?filter`, () => {
    it('Should get the 2 page of request with two different object', async () => {
      const response1 = await request(app)
        .get(`${API_URL}?page=1&limit=2`)
        .expect('Content-Type', /json/)
        .expect(200);

      const response2 = await request(app)
        .get(`${API_URL}?page=2&limit2`)
        .expect('Content-Type', /json/)
        .expect(200);

      // If 2 page is the same => the pagination not work
      const page1 = response1.body;
      const page2 = response2.body;
      expect(page1).not.toStrictEqual(page2);
    });
    it('Should get object with some filter', async () => {
      const response = await request(app)
        .get(`${API_URL}?brand=Nokia&priceFrom=1000`)
        .expect('Content-Type', /json/)
        .expect(200);

      const phones = response.body;
      expect(phones).toIncludeAllPartialMembers([{ brand: 'Nokia' }]);
    });
  });

  describe(`POST ${API_URL}`, () => {
    const phoneWithoutRequiredField = { test: true };
    const phoneWithInvalidField = {
      name: 'abc',
      price: '120',
      category: 'Điện thoại thông minh',
      test: true,
    };
    const phone = {
      name: 'Vivo Y21 4GB + 64GB',
      description:
        'Dù sở hữu dung lượng pin lớn tới 5000mAh nhưng Y21 vẫn mang một thân máy mỏng nhẹ chỉ 8.0mm với thiết kế Khung Viền Phẳng 2.5D, mang đến cảm giác cầm nắm thoải mái và cao cấp.',
      category: 'Điện thoại thông minh',
      brand: 'Vivo',
      variations: ['Trắng', 'Đen'],
      bundles: [
        {
          name: 'Điện thoại + Sạc',
          price: 3100000,
        },
        {
          name: 'Điện thoại + Ốp lưng',
          price: 3200000,
        },
      ],
      price: 3000000,
      test: true,
    };

    it('Should catch error if required field is empty', async () => {
      const response = await request(app)
        .post(API_URL)
        .send(phoneWithoutRequiredField)
        .expect('Content-Type', /json/)
        .expect(400);

      const errors = response.body;

      expect(errors).toContainValues([
        'Vui lòng nhập tên sản phẩm',
        'Vui lòng nhập giá sản phẩm',
        'Vui lòng nhập danh mục sản phẩm',
      ]);
    });

    it('Should catch error if field is not valid', async () => {
      const response = await request(app)
        .post(API_URL)
        .send(phoneWithInvalidField)
        .expect('Content-Type', /json/)
        .expect(400);

      const errors = response.body;
      expect(errors).toContainValues(['Tên sản phẩm phải có ít nhất 4 kí tự']);
    });

    it('Should created a new phone with 201 status code', async () => {
      const response = await request(app)
        .post(API_URL)
        .send(phone)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toMatchObject(phone);
    });
  });

  describe(`GET ${API_URL}/:id`, () => {
    it('Should return all test phones', async () => {
      const testPhones = await getTestPhones();
      for (const phone of testPhones) {
        const response = await request(app)
          .get(`${API_URL}/${phone._id}`)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({ _id: ObjectId(phone._id) });
      }
    });
  });

  describe('PUT ${API_URL}/:id', () => {
    const updatePhone = {
      brand: 'Test Brand',
    };
    it('Should update the phone at :id', async () => {
      const testPhones = await getTestPhones();

      for (const phone of testPhones) {
        const response = await request(app)
          .put(`${API_URL}/${phone._id}`)
          .send(updatePhone)
          .expect('Content-Type', /json/)
          .expect(200);

        const updatedPhone = response.body;
        expect(updatedPhone).toMatchObject({
          brand: 'Test Brand',
        });
      }
    });
  });

  describe(`DELETE ${API_URL}/:id`, () => {
    it('Should delete all test phones', async () => {
      const testPhones = await getTestPhones();
      for (let phone of testPhones) {
        const response = await request(app)
          .delete(`${API_URL}/${phone._id}`)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({ _id: ObjectId(phone._id) });
      }
    });
  });
});
