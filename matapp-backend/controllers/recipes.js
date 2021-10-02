const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')

recipesRouter.get('/:id', async (request, response) => {
  const returnedRecipe = await Recipe.findById(request.params.id)
  response.json(returnedRecipe)
})

recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({})
  return response.json(recipes)

})

recipesRouter.put('/:id', async (request, response) => {
  //console.log('Update recipe*******' )
  const updateRecipeId = request.params.id
  //console.log('Update recipe', updateRecipeId )
  //console.log(request.body)
  const updatedRecipe = await Recipe.findByIdAndUpdate(updateRecipeId, request.body, { new: true, runValidators: true })
  response.json(updatedRecipe)
})

recipesRouter.post('/', async (request, response) => {
  console.log('New recipe received: ', request.body)
  const recipe = new Recipe(request.body)
  const savedRecipe = await recipe.save()
  return response.json(savedRecipe)
})

module.exports = recipesRouter