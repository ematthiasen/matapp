const generateId = () => {
  return Math.floor(Math.random() * 10000)
}


export const setActiveRecipe = (recipe) => {
  //Recieve a whole recipe.
  return {
    type: 'SET_RECIPE',
    data: recipe
  }
}

export const addIngredientToRecipe = (ingredient) => {
  console.log('Ingredient: ', ingredient)
  return {
    type: 'ADD_INGREDIENT',
    data: {
      ...ingredient,
      id: generateId()
    }
  }
}

export const updateIngredientAmount = (ingredientId, newAmount) => {
  return {
    type: 'UPDATE_INGREDIENT_AMOUNT',
    data: {
      ingredientId,
      newAmount
    }
  }
}


const activeRecipeReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_RECIPE':{
    return action.data
  }
  case 'ADD_INGREDIENT':{
    const newIngredient = action.data
    const ingredientsArray = state.ingredients.concat(newIngredient)
    return { ...state, ingredients: ingredientsArray }
  }
  case 'UPDATE_INGREDIENT_AMOUNT': {
    const ingredientToUpdate = state.ingredients.find((ingredient) => ingredient.id === action.data.ingredientId)
    const updatedIngredient = {
      ...ingredientToUpdate,
      amount: action.data.newAmount
    }
    const newIngredientList = state.ingredients.map((ingredient) => ingredient.id !== updatedIngredient.id ? ingredient : updatedIngredient)
    //console.log('New state:', { ...state, ingredients: newIngredientList } )
    return { ...state, ingredients: newIngredientList }
  }
  default:
    return state
  }
}

export default activeRecipeReducer