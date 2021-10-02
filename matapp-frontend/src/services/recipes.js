import axios from 'axios'
//const baseUrl = 'http://localhost:3003/api/recipes'
const baseUrl = '/api/recipes'

const getAll = () => {
  return axios.get(baseUrl)
}

const getRecipe = (id) => {
  console.log('getting local recipe')
  return axios.get(`${baseUrl}/${id}`)
}

const createRecipe = (newRecipe) => {
  return axios.post(baseUrl, newRecipe)
}

const updateRecipe = (changedRecipe) => {
  return axios.put(`${baseUrl}/${changedRecipe.id}`, changedRecipe)
}

const deleteRecipe = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const recipeService = {
  getAll,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
}

export default recipeService