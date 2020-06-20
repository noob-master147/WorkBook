const request = require('supertest')
const app = require('../src/index')
jest.setTimeout(100000);



test('/', async() => {
    await request(app).get('/')
        .expect(200)

})



// test('user/checkFlag', async () => {
//     await request(app)
//         .post('/user/checkFlag')
//         .set('Authorization', 'XAvpYLfU9eTCTfCkEvQIH8nXpy62')
//         .send({
//             "id": "22258tk9zelzvg",
//             "flag": "CTF{flag1}"
//         })
//         .expect(200)

// })


// test('user/hint', async () => {
//     await request(app)
//         .post('/user/hint')
//         .set('Authorization', 'XAvpYLfU9eTCTfCkEvQIH8nXpy62')
//         .send({
//             "questionID": "22258tk9zelzvg"
//         })
//         .expect(200)

// })