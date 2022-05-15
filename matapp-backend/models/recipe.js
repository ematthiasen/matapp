const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ingredientSchema = require('./ingredient')
const dateFormatter = require('../utils/dateFormatter')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  template: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: false,
    min: '2021-01-01'
  },
  ingredients: [ingredientSchema]
})

recipeSchema.plugin(uniqueValidator)

recipeSchema.set('toJSON', {
  transform: (doc, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
    if (returnObject.date) {
      returnObject.date = dateFormatter.formatDate(returnObject.date)
    }
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)