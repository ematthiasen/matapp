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
      username: 'testuser',
      name: 'Test user',
      password: 'testpassword'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(200)
    
    console.log(response.body)
    expect(response.body.username).toBe('testuser')
    expect(response.body.name).toBe('Test user')
    expect(response.body.password).not.toBeDefined()
    expect(response.body.passwordHash).not.toBeDefined()


  })
  test('Creating a duplicate user fails', async () => {
    const user = {
      username: 'initialuser',
      name: 'does not matter',
      password: 'does not matter'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect(/(error)[^.]*(username)[^.]*(unique)[^.]*/i)

  })
  test('Logging in the initial user generates a valid token', async () => {
    const user = {
      username: 'initialuser',
      password: 'initialpassword'
    }
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    console.log('Response:', response.text)

    expect(response.body).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})