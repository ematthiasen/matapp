const Fooditem = require('../models/fooditem')
const logger = require('../utils/logger')
const Recipe = require('../models/recipe')


const getAllFooditems = async () => {
  const fooditems = await Fooditem.find({})
  logger.debug('Found and returning fooditems', fooditems)
  return fooditems
}

const createNewFooditem = async (newFooditem) => {
  logger.debug('fooditem received: ', newFooditem)
  //validation using schema
  //takes care of undefined 

  const fooditem = new Fooditem({
    name: newFooditem.name,
    protein: newFooditem.protein.replace(',', '.'),
    fat: newFooditem.fat.replace(',', '.'),
    carbohydrate: newFooditem.carbohydrate.replace(',', '.')
  })

  const savedFooditem = await fooditem.save()
  logger.debug('fooditem saved to database: ', savedFooditem)
  return savedFooditem
}

const deleteFooditem = async (fooditemId) => {
  logger.debug('fooditem ID to delete:', fooditemId)

    /*
  Is the fooditem used in a recipe?
    -> throw error with list of recipes the fooditem is in
  */
  const allRecipes = await Recipe.find({})
  logger.debug('check if fooditem ID is used in any recipes', fooditemId)

  const occurances = allRecipes.reduce((instances, recipe) => {
    logger.debug('checking', recipe)
    const result = recipe.ingredients.reduce((fooditemPresent, ingredient) => {
      logger.debug('checking ingredient', ingredient)
      logger.debug('comparing', ingredient.fooditemId.toString(), fooditemId)
      //Don't compare object and string. Make sure both are strings!
      return ingredient.fooditemId.toString() === fooditemId ?  true :  false || fooditemPresent
    }, false)
    
    if (result) {
      logger.debug('Ingredient precent in recipe ', recipe.title)
      const newInstances = instances.concat(recipe.title)
      logger.debug(newInstances)
      return newInstances
    } else {
      logger.debug('did not find ingredient ', recipe.title)
      return instances
    }

  }, [])
  
  if (occurances.length > 0) {
    const error = new Error()
    error.name = 'ValidationError'
    error.message = `Fooditem is in use in recipe(s) ${occurances}`
    throw error
  }

  //Work in progress
  //@BUG: <Deleted fooditem>, saving crashes. Check server.


  //const result = await Fooditem.findOneAndDelete({_id: fooditemId})
  const result = await Fooditem.findByIdAndRemove(fooditemId)
  return result
}

const updateFooditem = async (fooditemId, fooditem) => {
  //Custom validation does not seem to be working when using findByIdAndUpdate to update fat, carb or protein values
  //Instead getting record to update from database, updating with new data, creating a object based on schema and performing validation.
  //If validation succeeds, update item, otherwise throw validation error
  
  if (fooditem._id !== undefined && fooditem._id !== fooditemId) {
    const error = new Error()
    error.name = 'ValidationError'
    error.message = 'Validation failed: Do not try to update a fooditemId with a different fooditem id in the request body'
    throw error
  }

  const fooditemToUpdate = await Fooditem.findById(fooditemId)
  const updatedFooditem =  new Fooditem({ ...fooditemToUpdate.toJSON(), ...fooditem })
  
  let error = updatedFooditem.validateSync()
  if (error !== undefined) {
    throw error
  }

  const result = await Fooditem.findByIdAndUpdate(fooditemId, updatedFooditem.toJSON(), { new: true })
  logger.debug('Result', result)
  return result
}





module.exports = {
  getAllFooditems,
  createNewFooditem,
  deleteFooditem,
  updateFooditem
}