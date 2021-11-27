const Fooditem = require('../models/fooditem')
const logger = require('../utils/logger')


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
    protein: newFooditem.protein,
    fat: newFooditem.fat,
    carbohydrate: newFooditem.carbohydrate
  })

  const savedFooditem = await fooditem.save()
  logger.debug('fooditem saved to database: ', savedFooditem)
  return savedFooditem
}

const deleteFooditem = async (fooditemId) => {
  logger.debug('fooditem ID to delete:', fooditemId)

  /*Logic:
  Is user allowed to delete fooditem?
  Is the fooditem used in a recipe?
    -> return object that shows which recipes are in use?
  */


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