import axios from 'axios'
//const baseUrl = 'http://localhost:3003/api/recipes'
const baseUrl = '/api/recipes'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('token set:', token)
}

const getAll = () => {
  return axios.get(baseUrl)
}

const getRecipe = (id) => {
  console.log('getting local recipe')
  return axios.get(`${baseUrl}/${id}`)
}

const createRecipe = (newRecipe) => {
  const config = {
    headers: { Authorization: token }
  }

  return axios.post(baseUrl, newRecipe, config)
}

const updateRecipe = (changedRecipe) => {
  const config = {
    headers: { Authorization: token }
  }

  return axios.put(`${baseUrl}/${changedRecipe.id}`, changedRecipe, config)
}

const deleteRecipe = (recipeToDelete) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${recipeToDelete.id}`, config)
}

const addIngredientToRecipe = (recipe, ingredient) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(`${baseUrl}/${recipe.id}/ingredients`, ingredient, config)

}

const updateAllIngredients = (recipe, ingredientsList) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.put(`${baseUrl}/${recipe.id}/ingredients`, ingredientsList, config)
}

const updateIngredientInRecipe = (recipe, ingredient) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.put(`${baseUrl}/${recipe.id}/ingredients/${ingredient.id}`, ingredient, config)
}

const deleteIngredientFromRecipe = (recipe, ingredientId) => {
  console.log('we deleting now boys!')
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${recipe.id}/ingredients/${ingredientId}`, config)
}


const recipeService = {
  getAll,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  setToken,
  addIngredientToRecipe,
  updateIngredientInRecipe,
  deleteIngredientFromRecipe,
  updateAllIngredients
}

export default recipeService