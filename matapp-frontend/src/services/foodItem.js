import axios from 'axios'
//const baseUrl = 'http://localhost:3003/api/fooditems'
const baseUrl = '/api/fooditems'


const getAll = () => {
  console.log('getting all?')
  return axios.get(baseUrl)
}

const createFooditem = (newFooditem) => {
  return axios.post(baseUrl, newFooditem)
}

const updateFooditem = (id, changedFooditem) => {
  return axios.put(`${baseUrl}/${id}`, changedFooditem)
}

const deleteFooditem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const fooditemService = {
  getAll,
  createFooditem,
  updateFooditem,
  deleteFooditem

}

export default fooditemService