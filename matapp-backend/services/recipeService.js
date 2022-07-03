const Recipe = require('../models/recipe')
const logger = require('../utils/logger')
const ingredientSchema = require('../models/ingredient')
const mongoose = require('mongoose')
const dateFormatter = require('../utils/dateFormatter')


const checkUserPermissions = async (recipeId, authorizedUser) => {
  const recipeToCheck = await Recipe.findById(recipeId)

  logger.info('Checking user permissions')
  logger.info('AuthorizedUser', authorizedUser)
  logger.info('RecipeOwner', recipeToCheck.owner)
  if(authorizedUser.id !== recipeToCheck.owner.toHexString()) {
    logger.info(`User ${authorizedUser.username} denied`)
    const error = new Error()
    error.name = 'AuthenticationError'
    error.message = 'User not authorized to edit this recipe'
    throw error
  }
  logger.info(`User ${authorizedUser.username} authorized`)
  return false
}


const getOneRecipe = async (recipeId) => {
  const oneRecipe = await Recipe.findById(recipeId).populate('owner')
  
  return oneRecipe
}

const getAllRecipes = async (recipeData) => {
  const allRecipes = await Recipe.find({}).populate('owner')

  return allRecipes
}

const createRecipe = async (recipeData, authorizedUser) => {
  const recipeToCreate = {
    ...recipeData,
    //date: recipeData.date ? recipeData.date : dateFormatter.getDate()
    date: dateFormatter.getDate(),
    owner: authorizedUser.id
  }
  logger.info('Saving recipe, date is', recipeToCreate.date)

  //Check for recipes with same name. If exists, add version number and try again.
  //@TODO: Implement
  if (await Recipe.findOne({ title: recipeToCreate.title } )) {
    logger.debug(`${recipeToCreate.title} already exists`)

    //Deconstruct array, keep string in separate, and number separate
    let title  = recipeToCreate.title.split(' ')
    let iterationNumber = title.pop()
    title = title.join(' ')
    logger.debug('title', title)
    logger.debug('iterationNumber:', iterationNumber)
    if (!isNaN(iterationNumber)) {
      logger.debug('Found number: ', iterationNumber)
      //iterationNumber = Number(iterationNumber)
      
    } else {
      title = `${recipeToCreate.title} -`
      iterationNumber = 1
    }

    //That title already exists.
    while (await Recipe.findOne({ title: `${title} ${iterationNumber}` })) {
      iterationNumber++
    }

    recipeToCreate.title = `${title} ${iterationNumber}`
    logger.debug(recipeToCreate.title + 'XXX')
  }
  
  const recipe = new Recipe(recipeToCreate)
  const savedRecipe = await recipe.save()

  //Manually populate with owner?
  const savedRecipeWithOwner = savedRecipe.populate('owner')

  return savedRecipeWithOwner
}


const updateRecipe = async (recipeId, recipeData, authorizedUser) => {
  await checkUserPermissions(recipeId,authorizedUser)

  //only allowed to modify recipe title or template status
  const recipeToUpdate = await Recipe.findById(recipeId)

  const updatedRecipe = {
    title: recipeData.title ? recipeData.title : recipeToUpdate.title,
    template: recipeData.template ? recipeData.template : recipeToUpdate.template
  }
  
  const savedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedRecipe, { new:true, runValidators: true, context: 'query' })
  const savedRecipeWithOwner = savedRecipe.populate('owner')
  return savedRecipeWithOwner
}

const deleteRecipe = async (recipeId, authorizedUser) => {
  await checkUserPermissions(recipeId,authorizedUser)
  //only allowed to modify recipe title or template status
 
  const deletedRecipe = await Recipe.findByIdAndRemove(recipeId)
  return deletedRecipe

}


const updateIngredientList = async (recipeId, ingredientList, authorizedUser) => {
  await checkUserPermissions(recipeId,authorizedUser)

  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { ingredients: ingredientList }, {new: true, runValidators: true})
  const updatedRecipeWithOwner = updatedRecipe.populate('owner')
  return updatedRecipeWithOwner
}

const addIngredientToRecipe = async (recipeId, ingredient, authorizedUser) => {
  await checkUserPermissions(recipeId,authorizedUser)

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
  const updatedRecipeWithOwner = updatedRecipe.populate('owner')
  return updatedRecipeWithOwner

}

const updateIngredientInRecipe = async (recipeId, ingredientId, ingredient, AuthorizedUser) => {
  await checkUserPermissions(recipeId,authorizedUser)
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
  const updatedRecipeWithOwner = updatedRecipe.populate('owner')
  return updatedRecipeWithOwner
}

const deleteIngredientInRecipe = async (recipeId, ingredientId, authorizedUser) => {
  await checkUserPermissions(recipeId,authorizedUser)
  
  const recipeToUpdate = await Recipe.findById(recipeId)
  const newIngredientsList = recipeToUpdate.ingredients.filter(ingredient => ingredient.id !== ingredientId)
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { ingredients: newIngredientsList }, {new: true, runValidators: true})
  const updatedRecipeWithOwner = updatedRecipe.populate('owner')
  return updatedRecipeWithOwner


}

module.exports = {
  getOneRecipe,
  getAllRecipes,
  updateRecipe,
  createRecipe,
  deleteRecipe,
  addIngredientToRecipe,
  updateIngredientInRecipe,
  deleteIngredientInRecipe,
  updateIngredientList
}