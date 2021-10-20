const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Fooditem = require('../models/fooditem')
const helper = require('./test_helper')
const logger = require('../utils/logger')

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
  describe('Creating fooditems', () => {
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

  describe('deleting fooditems', () => {
    test('deleting a fooditem returns correct status code and the deleted fooditem', async () => {
      //Delete one of the initial fooditems
      
      let response = await api
        .delete('/api/fooditems/6160686d78c57517d2d6256f')
        .expect(200)
      
      logger.debug('Response body', response.body)
      expect(response.body.id).toBe('6160686d78c57517d2d6256f')
      expect(response.body.name).toBe('Fat')

      response = await api
        .get('/api/fooditems')
        .expect(200)
        .expect('Content-type', /application\/json/)
  
      expect(response.body).toHaveLength(helper.initialFooditems.length - 1)
    })

    test('deleting a non-existing fooditem returns the correct error code and list remains unchanged', async () => {
      let response = await api
        .delete('/api/fooditems/6160686d78cGGGG7d2d6256f')
        .expect(400)
        .expect(/(error)[^.]*/i)

      response = await api
        .get('/api/fooditems')
        .expect(200)
        .expect('Content-type', /application\/json/)
      
      expect(response.body).toHaveLength(3)

    })
  })
  describe('updating fooditems', () => {
    test('Changing the name of a fooditem works', async () => {
      
      const newFoodItem = {
        name: 'NewName'
      }

      let response = await api
        .put('/api/fooditems/6160686d78c57517d2d6256f')
        .send(newFoodItem)
        .expect(200)
      
      expect(response.body.name).toBe(newFoodItem.name)
      
      response = await api
        .get('/api/fooditems')
        .expect(200)
        .expect('Content-type', /application\/json/)
      //logger.debug('New fooditem list:', response.body)
      const updatedFooditem = response.body.find(item => item.id === '6160686d78c57517d2d6256f')

      expect(response.body).toHaveLength(3)
      expect(updatedFooditem.name).toBe(newFoodItem.name)

    })
    test('Modifying the fooditem with another fooditemId in body does not update fooditemId', async () => {
      const newFoodItem = {
        name: 'NewName',
        _id: '6161a293f3f4541e6b871291'
      }

      let response = await api
        .put('/api/fooditems/6160686d78c57517d2d6256f')
        .send(newFoodItem)
        .expect(400)
        .expect(/(Validation failed)[^.]*(expected)[^.]*(_id)[^.]*(unique)[^.]*/i)

      
    })
    test('Modifying the nutrient contents of the fooditem works', async () => {
      //test here
      expect(false).toBe(true)
    })
    test('Modifying name to a already existing name fails', async () => {
      //test here
      expect(false).toBe(true)
    })
    test('Modifying nutrient contents to negative values fail', async () => {
      //test here
      expect(false).toBe(true)
    })
    test('Modifying nutrient contents to values above 100 fails', async () => {
      //test here
      expect(false).toBe(true)
    })
    test('Modifying fooditem so that sum of nutrients is more than 100 fails', async () => {
      //test here
      expect(false).toBe(true)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})