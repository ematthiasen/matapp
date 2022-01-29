import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (userdata) => {
  //returns token or error
  const response = await axios.post(baseUrl, userdata)
  return response.data

}

const loginService = {
  loginUser
}

export default loginService