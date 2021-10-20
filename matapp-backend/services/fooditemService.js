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
  logger.debug('Attempting to update fooditem', fooditem)
  const result = await Fooditem.findByIdAndUpdate(fooditemId, fooditem, { new: true, runValidators: true })
  logger.debug('updated fooditem: ', result)
  return result
}





module.exports = {
  getAllFooditems,
  createNewFooditem,
  deleteFooditem,
  updateFooditem
}