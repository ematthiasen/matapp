const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Recipe = require('../models/recipe')
const Fooditem = require('../models/fooditem')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Fooditem.deleteMany({})
  await Recipe.deleteMany({})
  await helper.populateDbWithInitialFooditems()
})



describe('Recipes', () => {
  describe('Creating recipes', () => {
    test('Creating a recipe with empty ingredient list', async () => {
      const recipe = {
        title: 'New test recipe',
        template: false,
      }

      const response = await api
        .post('/api/recipes')
        .send(recipe)
        .expect(200)
      
      //console.log('Recipe created', response.body)

      expect(response.body.title).toEqual('New test recipe')
      expect(response.body.template).toEqual(false)
      expect(response.body.ingredients).toEqual([])
    })
    test('Creating a recipe with ingredients adds the ingredients', async () => {
      const recipe = {
        title: 'New test recipe with ingredients',
        template: false,
        ingredients: [
          {
            amount: 10,
            amountUnit: 'g',
            fooditemId: '6160686d78c57517d2d6256f'
          },
          {
            amount: 20,
            amountUnit: 'g',
            fooditemId: '61606a0b5ed3db7ba9cd1783'
          },
          {
            amount: 15,
            amountUnit: 'g',
            fooditemId: '61606a165ed3db7ba9cd1785'
          },
        ]
      }

      const response = await api
        .post('/api/recipes')
        .send(recipe)
        .expect(200)
      
      //console.log('Recipe created', response.body)

      expect(response.body.title).toEqual('New test recipe with ingredients')
      expect(response.body.template).toEqual(false)
      expect(response.body.ingredients).toHaveLength(3)
    })
    test('Creating a recipe with ingredients that have critical errors fails', async () => {
      const recipe = {
        title: 'Recipe with critical errors',
        template: false,
        ingredients: [
          {
            amount: 10,
            amountUnit: 'g',
            fooditemId: '6160686d78c57517d2d6256f'
          },
          {
            amount: 20,
            amountUnit: 'g',
            fooditemId: '61606a0b5ed3db7ba9cd1783'
          },
          {
            amount: 15,
            amountUnit: 'g',
          },
        ]
      }

      const response = await api
        .post('/api/recipes')
        .send(recipe)
        .expect(400)
    })
  })
  describe('Updating recipes', () => {
    beforeEach(async () => {
      await helper.populateWithOneRecipe()
    })
    test('Checking that beforeEach populates db properly', async () => {
      response = await api
        .get('/api/recipes')
        .expect(200)
      expect(response.body[0].title).toBe('Initial recipe')
    })
    test('Updating amount of ingredient in recipe works', async () => {
      //Rewrite 
      const updatedIngredient = 
        {
          amount: 69,
          id: '6161a20e23f4aee3176a6886'
        }
      
      const recipeId = '61632019d1ccf52ebafc7986'

      
      const response = await api
        .put(`/api/recipes/${recipeId}/ingredients/${updatedIngredient.id}`)
        .send(updatedIngredient)
        .expect(200)

      expect(response.body.ingredients[0].amount).toEqual(69)
      expect(response.body.ingredients).toHaveLength(3)

    })
    test('Updating amount of ingredient to a illegal value fails', async () => {
      const updatedIngredient = 
        {
          amount: -1,
          id: '6161a20e23f4aee3176a6886'
        }

      const recipeId = '61632019d1ccf52ebafc7986'

      const response = await api
      .put(`/api/recipes/${recipeId}/ingredients/${updatedIngredient.id}`)
      .send(updatedIngredient)
      .expect(400)
      .expect(/(Error)[^.]*(Validation)[^.]*(failed)[^.]* /i)

    })
    test('Updating a non-existing ingredient returns correct error code', async () => {

      const updatedIngredient = 
        {
          amount: -1,
          id: '6160686d78c57517d2d6256f' //invalid id
        }

      const recipeId = '61632019d1ccf52ebafc7986'

      const response = await api
      .put(`/api/recipes/${recipeId}/ingredients/${updatedIngredient.id}`)
      .send(updatedIngredient)
      .expect(400)
      .expect(/(Error)[^.]*(Invalid)[^.]*(malformed)[^.]* /i)

    })

    test('Adding an ingredient to a recipe works', async () => {
      //3 fooditems, 1 recipe
      //ingredient we want to add
      
      const ingredientToAdd = 
        {
          amount: 100,
          amountUnit: 'g',
          fooditemId: '6160686d78c57517d2d6256f'
        }


      const recipeId = helper.initialRecipe._id
      let response = await api
        .get(`/api/recipes/${recipeId}`)
        .expect(200)

      expect(response.body.ingredients).toHaveLength(3)


      response = await api
        .post(`/api/recipes/${recipeId}/ingredients`)
        .send(ingredientToAdd)
        .expect(200)

      expect(response.body.ingredients).toHaveLength(4)
      expect(response.body.ingredients[3]).toEqual(expect.objectContaining({amount: 100}))
      
    })
    test('Adding an invalid ingredient to a recipe fails works', async () => {
      const ingredientToAdd = 
        {
          amount: 100,
          amountUnit: 'g',
          fooditemId: 'notAnId'
        }


      const recipeId = helper.initialRecipe._id
      let response = await api
        .get(`/api/recipes/${recipeId}`)
        .expect(200)

      expect(response.body.ingredients).toHaveLength(3)


      response = await api
        .post(`/api/recipes/${recipeId}/ingredients`)
        .send(ingredientToAdd)
        .expect(400)
        .expect(/(Failed to validate)[^.]*/i)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})