const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const logger = require('../utils/logger')
const config = require('../utils/config')


const loginUser = async (userdata) => {
  logger.debug('LoginService: login attempted', userdata)
  //check if either username or password is missing 

  const user = await User.findOne({ username: userdata.username })

  const passwordCorrect = user === null
   ? false
   : await bcrypt.compare(userdata.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    const error = new Error()
    error.name = 'AuthenticationError'
    error.message = 'bad username or password'
    throw error
  }

  //create token
  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)



  return {
    token,
    username: user.username,
    name: user.name,
    id: user._id
  }

}

module.exports = {
  loginUser
}