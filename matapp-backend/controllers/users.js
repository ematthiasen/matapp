const usersRouter = require('express').Router()
const userService = require('../services/userService')

//Create new user
usersRouter.post('/', async (request, response) => {
  //pass body to user service
  console.log('request to create new user')
  const result = await userService.createUser(request.body)
  console.log('created user: ', result)
  return response.json(result)
  
})

module.exports = usersRouter

