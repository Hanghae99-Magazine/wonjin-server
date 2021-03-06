// π νμ€νΈ μλλ¦¬μ€
// ν ν° μλ¬ νμ€νΈ => νμκ°μ, λ‘κ·ΈμΈ νμ€νΈ

require('dotenv').config();
const app = require('../../app');
const { sequelize } = require('../../models');
const request = require('supertest');

let mytoken = '';
const postData = {
  img_position: 'left',
  post_img: 'it/777.img',
  post_content: 'νμ€νΈμ½λ it',
};

// DB μ°κ²°
beforeAll(async () => {
  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Database connected.');
    })
    .catch((err) => {
      console.error(err);
    });
});

test('GET / νμκ°μ νμ΄μ§ Code 200', async () => {
  const res = await request(app).get('/register');
  expect(res.status).toStrictEqual(200);
});

test('GET / λ‘κ·ΈμΈνμ΄μ§ Code 200', async () => {
  const res = await request(app).get('/login');
  expect(res.status).toStrictEqual(200);
});

describe('νμκ°μ, λ‘κ·ΈμΈ νμ€νΈ', () => {
  it('POST /register νμκ°μ μ²΄ν¬ Status 201', async () => {
    const res = await request(app).post('/register').send({
      user_id: 'won1',
      nickname: 'koko123',
      user_pw: 'won11',
      pw_check: 'won11',
    });
    expect(res.status).toEqual(201);
  });

  describe('νμκ°μ μλ¬', () => {
    it('λλ€μ, PW νμ λ―Έν‘ Status 400', async () => {
      const res = await request(app).post('/register').send({
        user_id: 'won3',
        nickname: 'ttt',
        user_pw: 'won',
        pw_check: 'won',
      });
      expect(res.status).toStrictEqual(400);
    });
    it('/register μ΄λ―Έ κ°μλ μ΄λ©μΌ λλ λλ€μ Status 400', async () => {
      const res = await request(app).post('/register').send({
        user_id: 'won1',
        nickname: 'koko123',
        user_pw: 'won11',
        pw_check: 'won11',
      });
      expect(res.status).toStrictEqual(400);
    });

    it('λΉλ°λ²νΈμ λλ€μ ν¬ν¨λ μλ¬ Status 400', async () => {
      const res = await request(app).post('/register').send({
        user_id: 'won',
        nickname: 'nick',
        user_pw: 'nick12345',
        pw_check: 'nick1234',
      });
      expect(res.status).toStrictEqual(400);
    });

    it('λΉλ°λ²νΈμ λ€λ¦ Status 400', async () => {
      const res = await request(app).post('/register').send({
        user_id: 'won1',
        nickname: 'ni123ck',
        user_pw: 'nidsadck12345',
        pw_check: 'k1234',
      });
      expect(res.status).toStrictEqual(400);
    });
  });

  it(' ID, PW λ€λ₯΄λ€. / λ‘κ·ΈμΈ μ€ν¨ Status 400', async () => {
    const res = await request(app).post('/login').send({
      user_id: 'won1',
      user_pw: 'won22',
    });
    expect(res.status).toStrictEqual(400);
  });

  it('POST /login λ‘κ·ΈμΈ μ±κ³΅ Status 201', async () => {
    const res = await request(app).post('/login').send({
      user_id: 'won1',
      user_pw: 'won11',
    });

    expect(res.status).toEqual(201);
    mytoken = res.body.mytoken;
  });

  describe('ν ν° μλ¬ νμ€νΈ', () => {
    it('POST /post tokenμ΄ μμλ Succes status 401', async () => {
      const res = await request(app)
        .post(`/post`)
        .set('authorization', ``)
        .send(postData);
      expect(res.status).toStrictEqual(401);
    });

    it('tokenType μ€λ₯ Succes status 401', async () => {
      const res = await request(app)
        .post(`/post`)
        .set('authorization', `Basic ${mytoken}`)
        .send(postData);
      expect(res.status).toStrictEqual(401);
    });

    it('μ°λ¦¬νμ ν ν°μ΄ μλ λ μ€λ₯ Succes status 401', async () => {
      const invalidToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.5fRN2-ecsTQmI8ApQrA9gBV2dsde2etTzTAUtyXNCO1vqDJBE';
      const res = await request(app)
        .post(`/post`)
        .set('authorization', `Bearer ${invalidToken}`)
        .send(postData);
      expect(res.status).toStrictEqual(401);
    });
  });
});

// DB μ΄κΈ°ν
afterAll(async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Database reset.');
    })
    .catch((err) => {
      console.error(err);
    });
});
