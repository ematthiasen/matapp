const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('./utils/config')




// eslint-disable-next-line no-undef
const url = config.MONGODB_URI


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

//recipeSchema.plugin(uniqueValidator)

recipeSchema.set('toJSON', {
  transform: (doc, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})
Recipe = mongoose.model('Recipe', recipeSchema)


const initialRecipe = {
  title: 'Initial recipe 4',
  template: true,
  ingredients:
  [
    {
      amount: 20,
      amountUnit: 'g',
      fooditemId: '6160686d78c57517d2d6256f',
      //foodItemId: mongoose.Types.ObjectId('6160686d78c57517d2d6256f'),
      //_id: mongoose.Types.ObjectId('6161a20e23f4aee3176a6886')
  
    },
    {
      amount: 40,
      amountUnit: 'g',
      fooditemId: '61606a0b5ed3db7ba9cd1783',
      //foodItemId: mongoose.Types.ObjectId('61606a0b5ed3db7ba9cd1783'),
      //_id: mongoose.Types.ObjectId('6161a293f3f4541e6b871291')
    },
    {
      amount: 60,
      amountUnit: 'g',
      fooditemId: '61606a165ed3db7ba9cd1785',
      //foodItemId: mongoose.Types.ObjectId('61606a165ed3db7ba9cd1785'),
      //_id: mongoose.Types.ObjectId('6161a293f3f4541e6b871293')
    }
  ]
}

/*
// eslint-disable-next-line no-undef
if (process.argv.length < 5) {
  //get and display phonebook here
  console.log('REcipes:')
  mongoose.connect(url)
  Recipe
    .find({})
    .then(result => {
      result.forEach(recipe => {
        console.log(recipe)
      })
      mongoose.connection.close()
    })
}
*/
const recipe = new Recipe(initialRecipe)
console.log('recipe object created: ', recipe)
mongoose.connect(url)

recipe
  .save()
  .then(() => {
    console.log('recipe created')
    mongoose.connection.close()
  })



