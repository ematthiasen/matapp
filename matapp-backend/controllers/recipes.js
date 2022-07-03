const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const logger = require('../utils/logger')
const recipeService = require('../services/recipeService')
const { userAuthenticator } = require('../utils/middleware')

recipesRouter.get('/:id', async (request, response) => {
  const recipe = await recipeService.getOneRecipe(request.params.id)
  response.json(recipe)
})

recipesRouter.get('/', async (request, response) => {
  const allRecipes = await recipeService.getAllRecipes()
  return response.json(allRecipes)

})

recipesRouter.put('/:id', userAuthenticator, async (request, response) => {
  //TODO: Only modify name and/or template, not ingredients.
  //Ingredients modified through ingredients
  const updateRecipeId = request.params.id

  // Send userAuthenticator data to service, and let service handle it.

  const updatedRecipe = await recipeService.updateRecipe(updateRecipeId, request.body, request.authorizedUser)
  //const updatedRecipe = await Recipe.findByIdAndUpdate(updateRecipeId, request.body, { new: true, runValidators: true })
  response.json(updatedRecipe)
})

//@TODO: Update to use recipeService
recipesRouter.post('/', userAuthenticator, async (request, response) => {
  console.log('New recipe received: ', request.body)
  
  //Add user id to new recipe

  const createdRecipe = await recipeService.createRecipe(request.body, request.authorizedUser)
  return response.json(createdRecipe)
  //const recipe = new Recipe(request.body)
  //const savedRecipe = await recipe.save()
  //return response.json(savedRecipe)
})

//@TODO: Update to use recipeService
recipesRouter.delete('/:id', userAuthenticator, async (request, response) => {
  logger.debug('Received request to delete recipe id', request.params.id )
  const result = await recipeService.deleteRecipe(request.params.id, request.authorizedUser)
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

recipesRouter.delete('/:recipeId/ingredients/:ingredientId', userAuthenticator, async (request, response) => {
  //delete one ingredient in the recipe
  logger.debug('Recipeid', request.params.recipeId, 'ingredient to delete', request.params.ingredientId, request.body)

  const returnObject = await recipeService.deleteIngredientInRecipe(request.params.recipeId, request.params.ingredientId, request.authorizedUser)
  return response.status(200).json(returnObject)
})

recipesRouter.post('/:id/ingredients', userAuthenticator, async (request, response) => {
  //add an ingredient to the recipe
  logger.debug('Recipeid', request.params.id, 'ingredient to add', request.body)
  const returnObject = await recipeService.addIngredientToRecipe(request.params.id, request.body, request.authorizedUser)
  if (returnObject) {
    //for now return success
    return response.status(200).json(returnObject)
  } else {
    return response.status(400).json({error: 'Failed to validate ingredient'})
  }
})

//update the whole ingredients table at once - 
recipesRouter.put('/:id/ingredients', userAuthenticator, async (request, response) => {
  logger.debug('RecipeId', request.params.id, 'new ingredients list', request.body)

  const returnObject = await recipeService.updateIngredientList(request.params.id, request.body, request.authorizedUser)
  return response.status(200).json(returnObject)
})


recipesRouter.put('/:recipeId/ingredients/:ingredientId', userAuthenticator, async (request, response) => {
  //update an ingredient in the recipe
  logger.debug('Recipeid', request.params.recipeId, 'ingredient to update', request.params.ingredientId, request.body)


  const returnObject = await recipeService.updateIngredientInRecipe(request.params.recipeId, request.params.ingredientId, request.body)
  return response.status(200).json(returnObject)
})



module.exports = recipesRouter