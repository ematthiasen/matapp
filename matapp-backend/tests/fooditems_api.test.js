const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Fooditem = require('../models/fooditem')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Fooditem.deleteMany({})
  await helper.populateDbWithInitialFooditems()
  
})

describe('fooditems', () => {

  test('Get all fooditems as JSON', async () => {
    const response = await api
      .get('/api/fooditems')
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialFooditems.length)

    expect(response.body).toEqual(expect.arrayContaining([ expect.objectContaining(
      {
        id: '6160686d78c57517d2d6256f',
        name: 'Fat',
        fat: 100
      })
    ]))
    expect(response.body).toEqual(expect.arrayContaining([ expect.objectContaining(
      {
        id: '61606a0b5ed3db7ba9cd1783',
        name: 'Protein',
        protein: 100
      }
    ) ]))
    expect(response.body).toEqual(expect.arrayContaining([ expect.objectContaining(
      {
        id: '61606a165ed3db7ba9cd1785',
        name: 'Carbs',
        carbohydrate: 100,
      }
    ) ]))
    //expect(response.body[0].name).toBe(helper.initialFooditems[0].name)
    //Fails when using promise array, order can not be guaranteed when created simultaneously


  })
  test('Creating new fooditem', async () => {
    const fooditem = {
      name: 'Testfood',
      fat: 1,
      protein: 1,
      carbohydrate: 1
    }

    const response = await api
      .post('/api/fooditems')
      .send(fooditem)
      .expect(200)

    expect(response.body.name).toBe('Testfood')

  })
  test('When creating fooditems, default values are set to 0 when no data is provided', async () => {
    const fooditem = {
      name: 'Testfood'
    }
    
    const response = await api
      .post('/api/fooditems')
      .send(fooditem)
      .expect(200)
      .expect('Content-type', /application\/json/)
    
    
    expect(response.body.name).toBe('Testfood')
    expect(response.body.fat).toBe(0)
    expect(response.body.carbohydrate).toBe(0)
    expect(response.body.protein).toBe(0)
  })

  test('Attempting to create fooditems with same name returns error code', async () => {
    let fooditem = helper.initialFooditems[0]
    const response = await api
      .post('/api/fooditems')
      .send(fooditem)
      .expect(400)
      .expect(/error/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})