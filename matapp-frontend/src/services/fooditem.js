import axios from 'axios'
//const baseUrl = 'http://localhost:3003/api/fooditems'
const baseUrl = '/api/fooditems'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('token set:', token)
}

const getAll = () => {
  console.log('getting all?')
  return axios.get(baseUrl)
}

const createFooditem = (newFooditem) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('config:', config)
  return axios.post(baseUrl, newFooditem, config)
}

const updateFooditem = (id, changedFooditem) => {
  return axios.put(`${baseUrl}/${id}`, changedFooditem)
}

const deleteFooditem = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('config:', config)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const fooditemService = {
  setToken,
  getAll,
  createFooditem,
  updateFooditem,
  deleteFooditem

}

export default fooditemService
