const request = require('supertest');
const app = require('@src/app');

// More utils to work with Jest
const { toIncludeAllPartialMembers } = require('jest-extended');
expect.extend({ toIncludeAllPartialMembers });

const { mongoConnect, mongoDisconnect } = require('@utils/mongo');

describe('Launches API', () => {
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

  describe('POST /api/v1/smartphones', () => {
    const smartphoneWithoutRequiredField = {};
    const smartphoneWithInvalidField = {
      title: 'abc',
      price: '123',
    };
    const smartphone = {
      title: 'Vivo Y21 4GB + 64GB',
      description:
        'Dù sở hữu dung lượng pin lớn tới 5000mAh nhưng Y21 vẫn mang một thân máy mỏng nhẹ chỉ 8.0mm với thiết kế Khung Viền Phẳng 2.5D, mang đến cảm giác cầm nắm thoải mái và cao cấp.',
      brand: 'Vivo',
      color: 'Blue',
      price: 3550000,
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
        .send(smartphoneWithoutRequiredField)
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
});
