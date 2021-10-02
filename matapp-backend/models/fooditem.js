const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const fooditemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  protein: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    validate: {
      validator: function (value) {
        return (value + this.fat + this.carbohydrate) <= 100
      },
      message: 'Sum of fat, protein and carbs cannot be greater than 100'
    },
  },
  fat: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    validate: {
      validator: function (value) {
        return (value + this.protein + this.carbohydrate) <= 100
      },
      message: 'Sum of fat, protein and carbs cannot be greater than 100'
    },
  },
  carbohydrate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    validate: {
      validator: function (value) {
        return (value + this.fat + this.protein) <= 100
      },
      message: 'Sum of fat, protein and carbs cannot be greater than 100'
    },
  }
})

fooditemSchema.plugin(uniqueValidator)

fooditemSchema.set('toJSON', {
  transform: (doc, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Fooditem', fooditemSchema)
