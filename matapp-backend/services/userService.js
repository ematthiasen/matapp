const User = require('../models/user')
const bcrypt = require('bcryptjs')
const logger = require('../utils/logger')

const createUser = async (userdata) => {
  logger.debug('creating new user')
  //check that minimum data is received
  //TODO: add more password complexity requirements here
  if (userdata.password === undefined || userdata.password.length < 8) {
    console.log('Error caught!!!')
    const error = new Error()
    error.name = 'ValidationError'
    error.message = 'Error: Password needs to be at least 8 characters long'
    throw error
  }
  
  //create passwordhash from password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(userdata.password, saltRounds)
  
  //create and validate mongoose model 
  const user = new User({
    username: userdata.username,
    name: userdata.name,
    passwordHash
  })
  console.log('New user created, before save', user)

  //validation when creating new user
  const savedUser = await user.save()
  console.log('saveduser:', savedUser)
  return savedUser

}

module.exports = {
  createUser
}