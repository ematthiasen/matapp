const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ingredientSchema = require('./ingredient')

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
  ingredients: [ingredientSchema]
})

recipeSchema.plugin(uniqueValidator)

recipeSchema.set('toJSON', {
  transform: (doc, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)