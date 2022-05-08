const Recipe = require('../models/recipe')
const logger = require('../utils/logger')
const ingredientSchema = require('../models/ingredient')
const mongoose = require('mongoose')

const getOneRecipe = async (recipeId) => {
  const oneRecipe = await Recipe.findById(recipeId)
  return oneRecipe
}

const getAllRecipes = async () => {
  const allRecipes = await Recipe.find({})
  return allRecipes
}

const updateRecipe = async (recipeId, recipeData) => {
  //only allowed to modify recipe title or template status
  const recipeToUpdate = await Recipe.findById(recipeId)

  const updatedRecipe = {
    ...recipeToUpdate,
    title: recipeData.title ? recipeData.title : recipeToUpdate.title,
    template: recipeData.template ? recipeData.template : recipeToUpdate.template
  }
  logger.debug(updatedRecipe)


  const savedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedRecipe, {new: true, runValidators: true})
  return savedRecipe  
}

const updateIngredientList = async (recipeId, ingredientList) => {
  //const recipeToUpdate = await Recipe.findById(recipeId)

  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { ingredients: ingredientList }, {new: true, runValidators: true})
  return updatedRecipe
}

const addIngredientToRecipe = async (recipeId, ingredient) => {
  const recipeToUpdate = await Recipe.findById(recipeId)
  //logger.debug('Recipe found:', recipeToUpdate)
  
  //check that ingredient is valid, or just use schema? 
  const Ingredient = mongoose.model('Ingredient', ingredientSchema)
  const createdIngredient = new Ingredient(ingredient)

  error = createdIngredient.validateSync()
  if (error !== undefined) {
    //logger.debug('Failed to validate ingredient')
    return false
  }
  //logger.debug('Ingredient passed validation')

  const newIngredientsList = recipeToUpdate.ingredients.concat(createdIngredient)
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { ingredients: newIngredientsList }, {new: true, runValidators: true})
  return updatedRecipe

}

const updateIngredientInRecipe = async (recipeId, ingredientId, ingredient) => {
  //logger.debug('Entering updateIngredientInRecipe')
  const recipeToUpdate = await Recipe.findById(recipeId)
  const ingredientToUpdate = recipeToUpdate.ingredients.find(item => item.id === ingredientId)
  //logger.debug('IngredientToUpdate:', ingredientToUpdate)
  if (ingredientToUpdate === undefined) {
    const error = new Error('Invalid or malformed ingredient id')
    error.name = 'CastError'
    throw error
  }

  const ingredientObject = {
    amount: ingredient.amount || ingredientToUpdate.amount,
    amountUnit: ingredient.amountUnit || ingredientToUpdate.amountUnit,
    fooditemId: ingredient.fooditemId || ingredientToUpdate.fooditemId.toHexString(),
    id: ingredientToUpdate._id.toHexString()
  }

  const newIngredients = recipeToUpdate.ingredients.map(item => item.id !== ingredientObject.id ? item : ingredientObject)
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { ingredients: newIngredients }, {new: true, runValidators: true})
  return updatedRecipe
}

const deleteIngredientInRecipe = async (recipeId, ingredientId) => {
  const recipeToUpdate = await Recipe.findById(recipeId)

  const newIngredientsList = recipeToUpdate.ingredients.filter(ingredient => ingredient.id !== ingredientId)
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { ingredients: newIngredientsList }, {new: true, runValidators: true})
  return updatedRecipe


}

module.exports = {
  getOneRecipe,
  getAllRecipes,
  updateRecipe,
  addIngredientToRecipe,
  updateIngredientInRecipe,
  deleteIngredientInRecipe,
  updateIngredientList
}