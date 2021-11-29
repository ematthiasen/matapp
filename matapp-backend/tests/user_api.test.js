const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const logger = require('../utils/logger')

const api = supertest(app)

beforeEach( async () => {
  //add a default user or two to test database
  await User.deleteMany({})
  await helper.populateDbWithInitialUser()

})


describe('Users', () => {
  test('Creating a user with valid data', async () => {
    const user = {
      username: 'ematthiasen',
      name: 'Eirik',
      password: 'eirikpassword'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(200)
    
    console.log(response.body)
    expect(response.body.username).toBe('ematthiasen')
    expect(response.body.name).toBe('Eirik')
    expect(response.body.password).not.toBeDefined()
    expect(response.body.passwordHash).not.toBeDefined()


  })
  test('Creating a duplicate user fails', async () => {
    const user = {
      username: 'testuser1',
      name: 'does not matter',
      password: 'does not matter'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect(/(error)[^.]*(username)[^.]*(unique)[^.]*/i)

  })
})

afterAll(() => {
  mongoose.connection.close()
})