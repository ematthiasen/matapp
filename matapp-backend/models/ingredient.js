const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: false,
    min: 0
  },
  amountUnit: {
    type: String,
    required: true,
  },
  fooditemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fooditem',
    required: true
  }
})

ingredientSchema.set('toJSON', {
  transform: (doc, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = ingredientSchema