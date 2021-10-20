const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const logger = require('../utils/logger')
const recipeService = require('../services/recipeService')

recipesRouter.get('/:id', async (request, response) => {
  const returnedRecipe = await Recipe.findById(request.params.id)
  response.json(returnedRecipe)
})

recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({})
  return response.json(recipes)

})

recipesRouter.put('/:id', async (request, response) => {
  //TODO: Only modify name and/or template, not ingredients.
  //Ingredients modified through ingredients
  const updateRecipeId = request.params.id
  const updatedRecipe = await Recipe.findByIdAndUpdate(updateRecipeId, request.body, { new: true, runValidators: true })
  response.json(updatedRecipe)
})

recipesRouter.post('/', async (request, response) => {
  console.log('New recipe received: ', request.body)
  const recipe = new Recipe(request.body)
  const savedRecipe = await recipe.save()
  return response.json(savedRecipe)
})

recipesRouter.delete('/:id', async (request, response) => {
  logger.debug('Received request to delete recipe id', request.params.id )
  const result = await Recipe.findByIdAndRemove(request.params.id)
  return response.status(200).json(result)
})

/*
// ***** INGREDIENTS *****
*/
recipesRouter.get('/:id/ingredients', async (request, response) => {
  
  //return the ingredients of the recipe
  //const returnedRecipe = await Recipe.findById(request.params.id)
  //response.json(returnedRecipe)
})

recipesRouter.post('/:id/ingredients', async (request, response) => {
  //add an ingredient to the recipe
  //logger.debug('Recipeid', request.params.id, 'ingredient to add', request.body)
  const returnObject = await recipeService.addIngredientToRecipe(request.params.id, request.body)
  if (returnObject) {
    //for now return success
    return response.status(200).json(returnObject)
  } else {
    return response.status(400).json({error: 'Failed to validate ingredient'})
  }
})

recipesRouter.put('/:recipeId/ingredients/:ingredientId', async (request, response) => {
  //update an ingredient in the recipe
  logger.debug('Recipeid', request.params.recipeId, 'ingredient to update', request.params.ingredientId, request.body)


  const returnObject = await recipeService.updateIngredientInRecipe(request.params.recipeId, request.params.ingredientId, request.body)
  return response.status(200).json(returnObject)
})

module.exports = recipesRouter