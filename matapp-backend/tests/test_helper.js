const mongoose = require('mongoose')
const Fooditem = require('../models/fooditem')
const Recipe = require('../models/recipe')
const User = require('../models/user')

const initialUser = {
  username: 'initialuser',
  name: 'Initial User',
  password: 'initialpassword',
  passwordHash: '$2b$10$51Y6B4nWar6at7b7RUqRZOzYIOE2lBZcVuIwIjYlHVCy4ikTbHmQK',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluaXRpYWx1c2VyIiwiaWQiOiI2MWE3YWUxNTYxYmMxMGY0ZjEwZjA4N2IiLCJpYXQiOjE2MzgzNzk1NDV9.ILYYGoNyP11sLz2vU3NpThf-qI6CcBYsj4GNEcn-ut0',
  _id: mongoose.Types.ObjectId('61a7ae1561bc10f4f10f087b')
}

const populateDbWithInitialUser = async () => {
  const user = new User(initialUser)
  await user.save()
}

const initialFooditems =
[
  {
    _id: mongoose.Types.ObjectId('6160686d78c57517d2d6256f'),
    name: 'Fat',
    fat: 100
  },
  {
    _id: mongoose.Types.ObjectId('61606a0b5ed3db7ba9cd1783'),
    name: 'Protein',
    protein: 100
  },
  {
    _id: mongoose.Types.ObjectId('61606a165ed3db7ba9cd1785'),
    name: 'Carbs',
    carbohydrate: 100
  }
]

const initialRecipe = {
  title: 'Initial recipe',
  template: true,
  ingredients:
  [
    {
      amount: 20,
      amountUnit: 'g',
      fooditemId: '6160686d78c57517d2d6256f',
      //foodItemId: mongoose.Types.ObjectId('6160686d78c57517d2d6256f'),
      _id: mongoose.Types.ObjectId('6161a20e23f4aee3176a6886')
  
    },
    {
      amount: 40,
      amountUnit: 'g',
      fooditemId: '61606a0b5ed3db7ba9cd1783',
      //foodItemId: mongoose.Types.ObjectId('61606a0b5ed3db7ba9cd1783'),
      _id: mongoose.Types.ObjectId('6161a293f3f4541e6b871291')
    },
    {
      amount: 60,
      amountUnit: 'g',
      fooditemId: '61606a165ed3db7ba9cd1785',
      //foodItemId: mongoose.Types.ObjectId('61606a165ed3db7ba9cd1785'),
      _id: mongoose.Types.ObjectId('6161a293f3f4541e6b871293')
    }
  ],
  _id: mongoose.Types.ObjectId('61632019d1ccf52ebafc7986')
}


const populateDbWithInitialFooditems = async () => {
  const fooditemObjects = initialFooditems.map(fooditem => new Fooditem(fooditem))
  const promiseArray = fooditemObjects.map(fooditem => fooditem.save())
  await Promise.all(promiseArray)
}


const populateWithOneRecipe = async () => {
  const recipeObject = new Recipe(initialRecipe)
  await recipeObject.save()
}


module.exports = 
{
  initialFooditems,
  initialRecipe,
  initialUser,
  populateDbWithInitialFooditems,
  populateWithOneRecipe,
  populateDbWithInitialUser
  
}