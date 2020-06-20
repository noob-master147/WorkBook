const request = require('supertest')
const app = require('../src/index')
jest.setTimeout(100000);



test('/customer', async() => {
    await request(app).get('/')
        .expect(200)

})