const fooditemsRouter = require('express').Router()
const Fooditem = require('../models/fooditem')


// New change to file
fooditemsRouter.get('/', async (request, response) => {
  const fooditems = await Fooditem.find({})
  return response.json(fooditems)
})

fooditemsRouter.post('/', async (request, response) => {
  const body = request.body

  const fooditem = new Fooditem({
    name: body.name,
    protein: body.protein,
    fat: body.fat,
    carbohydrate: body.carbohydrate
  })

  const savedfooditem = await fooditem.save()
  return response.json(savedfooditem)
})

module.exports = fooditemsRouter
