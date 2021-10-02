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
      const ingredients = helper.initialRecipe.ingredients
      const originalAmount = ingredients[0].amount
      ingredients[0].amount = ingredients[0].amount + 69
      const updatedRecipe = {
        ...helper.initialRecipe,
        ingredients: ingredients
      }
      
      const response = await api
        .put(`/api/recipes/${updatedRecipe._id}`)
        .send(updatedRecipe)
        .expect(200)

      expect(response.body.ingredients[0].amount).toEqual(originalAmount + 69)

    })
    test('Updating amount of ingredient to a illegal value fails', async () => {
      const ingredients = helper.initialRecipe.ingredients
      ingredients[0].amount = -1
      const updatedRecipe = {
        ...helper.initialRecipe,
        ingredients: ingredients
      }

      const response = await api
      .put(`/api/recipes/${updatedRecipe._id}`)
      .send(updatedRecipe)
      .expect(400)
      .expect(/(Error)[^.]*(Validation)[^.]*(failed)[^.]* /i)

    })
    test('Updating a non-existing ingredient returns correct error code', async () => {
      //This will just delete ingredients and replace with others (maybe?)
      //This will just create the ingredient, if a valid object is given.

      //Need to implement the ingredients API, and send whole recipe. Find recipe, then update the ingredient specifically!


      const ingredients = helper.initialRecipe.ingredients
      ingredients[0] = {
        ...ingredients[0],
        _id: '6160686d78c57517d2d6256f',
        amount: 10
      }

      const updatedRecipe = {
        ...helper.initialRecipe,
        ingredients: ingredients
      }
      const response = await api
      .put(`/api/recipes/${updatedRecipe._id}`)
      .send(updatedRecipe)
      .expect(400)
      .expect(/(Error)[^.]*(Validation)[^.]*(failed)[^.]* /i)
    })
    test('Adding an ingredient to a recipe works', async () => {
      //ingredient we want to add
      
      /*
      const ingredientToAdd = helper.initialIngredients[2]

      const recipeId = helper.initialRecipe._id
      let response = await api
        .get(`/api/recipes/${recipeId}`)
        .expect(200)

      expect(response.body.ingredients).toHaveLength(2)
      const modifiedRecipe = {
        ...response.body,
        ingredients: response.body.ingredients.concat(ingredientToAdd._id)
      }
      response = await api
        .put(`/api/recipes/${recipeId}`)
        .send(modifiedRecipe)
        .expect(200)

      expect(response.body.ingredients).toHaveLength(3)
      expect(response.body.ingredients[2]).toEqual(ingredientToAdd._id.toHexString())
      */
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})