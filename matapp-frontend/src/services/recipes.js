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

const recipeService = {
  getAll,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  setToken
}

export default recipeService