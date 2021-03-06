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

describe('Phones testing', () => {
  const API_URL = `/api/${process.env.API_VERSION}/phones`;

  describe(`GET ${API_URL}`, () => {
    it('Should response with 200 status code', async () => {
      await request(app)
        .get(API_URL)
        .set('Cookie', `jwt=${token};`)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe(`GET ${API_URL}/?filter`, () => {
    it('Should get the 2 page of request with two different object', async () => {
      const response1 = await request(app)
        .get(`${API_URL}?page=1&limit=2`)
        .set('Cookie', [`jwt=${token};`])
        .expect('Content-Type', /json/)
        .expect(200);

      const response2 = await request(app)
        .get(`${API_URL}?page=2&limit2`)
        .set('Cookie', [`jwt=${token};`])
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
        .set('Cookie', [`jwt=${token};`])
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
      category: '??i???n tho???i th??ng minh',
      test: true,
    };
    const phone = {
      name: 'Vivo Y21 4GB + 64GB',
      description:
        'D?? s??? h???u dung l?????ng pin l???n t???i 5000mAh nh??ng Y21 v???n mang m???t th??n m??y m???ng nh??? ch??? 8.0mm v???i thi???t k??? Khung Vi???n Ph???ng 2.5D, mang ?????n c???m gi??c c???m n???m tho???i m??i v?? cao c???p.',
      category: '??i???n tho???i th??ng minh',
      brand: 'Vivo',
      variations: ['Tr???ng', '??en'],
      bundles: [
        {
          name: '??i???n tho???i + S???c',
          price: 3100000,
        },
        {
          name: '??i???n tho???i + ???p l??ng',
          price: 3200000,
        },
      ],
      price: 3000000,
      test: true,
    };

    it('Should catch error if required field is empty', async () => {
      const response = await request(app)
        .post(API_URL)
        .set('Cookie', [`jwt=${token};`])
        .send(phoneWithoutRequiredField)
        .expect('Content-Type', /json/)
        .expect(400);

      const errors = response.body;

      expect(errors).toContainValues([
        'Vui l??ng nh???p t??n s???n ph???m',
        'Vui l??ng nh???p gi?? s???n ph???m',
        'Vui l??ng nh???p danh m???c s???n ph???m',
      ]);
    });

    it('Should catch error if field is not valid', async () => {
      const response = await request(app)
        .post(API_URL)
        .set('Cookie', [`jwt=${token};`])
        .send(phoneWithInvalidField)
        .expect('Content-Type', /json/)
        .expect(400);

      const errors = response.body;
      expect(errors).toContainValues(['T??n s???n ph???m ph???i c?? ??t nh???t 4 k?? t???']);
    });

    it('Should created a new phone with 201 status code', async () => {
      const response = await request(app)
        .post(API_URL)
        .set('Cookie', [`jwt=${token};`])
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
          .set('Cookie', [`jwt=${token};`])
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
          .set('Cookie', [`jwt=${token};`])
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
          .set('Cookie', [`jwt=${token};`])
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toMatchObject({ _id: ObjectId(phone._id) });
      }
    });
  });
});
