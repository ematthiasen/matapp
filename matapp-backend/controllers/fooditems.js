const fooditemsRouter = require('express').Router()
//const Fooditem = require('../models/fooditem')
const fooditemService = require('../services/fooditemService')
const logger = require('../utils/logger')

// New change to file
fooditemsRouter.get('/', async (request, response) => {
  //const fooditems = await Fooditem.find({})
  const fooditems = await fooditemService.getAllFooditems()
  return response.json(fooditems)
})

fooditemsRouter.post('/', async (request, response) => {
  const createdFooditem = await fooditemService.createNewFooditem(request.body)
  logger.debug('fooditemsRouter received:', createdFooditem )
  return response.json(createdFooditem)
})

fooditemsRouter.delete('/:id', async (request, response) => {
  logger.debug('Attempt to delete id:', request.params.id)
  const deletedFooditem = await fooditemService.deleteFooditem(request.params.id)
  //better return value
  return response.json(deletedFooditem)
})

fooditemsRouter.put('/:id', async (request, response) => {
  const updatedFooditem = await fooditemService.updateFooditem(request.params.id, request.body)
  return response.json(updatedFooditem)
})

module.exports = fooditemsRouter
