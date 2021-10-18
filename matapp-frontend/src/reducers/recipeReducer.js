//NO async with thunk yet
//import recipeService from '../services/recipes'

export const initRecipes = (recipeList) => {

  return {
    type: 'INIT_RECIPES',
    data: recipeList
  }
}

export const updateRecipe = (recipe) => {
  return {
    type: 'UPDATE_RECIPE',
    data: recipe
  }
}

export const addRecipe = (recipe) => {
  return {
    type: 'ADD_RECIPE',
    data: recipe
  }
}

export const deleteRecipe = (recipe) => {
  return {
    type: 'ADD_RECIPE',
    data: recipe
  }
}

const recipeReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_RECIPES':
    return action.data
  case 'ADD_RECIPE':
    return state.concat(action.data)
  case 'UPDATE_RECIPE':{
    const selectedRecipe = state.find(recipe => recipe.id === action.data.id)
    console.log('Updated recipe ', selectedRecipe )
    return state.map(recipe => recipe.id !== action.data.id ? recipe : action.data)
  }
  case 'DELETE_RECIPE': {
    const newState = state.filter(recipe => recipe.id !== action.data.id)
    return newState
  }
  default:
    return state
  }
}

export default recipeReducer