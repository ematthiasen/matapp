const loginRouter = require('express').Router()
const loginService = require('../services/loginService')
const logger = require('../utils/logger')


loginRouter.post('/', async (request, response) => {
  logger.debug('LoginRouter: Login attempted', request.body)
  const tokenAndUserdata = await loginService.loginUser(request.body)
  return response.send(tokenAndUserdata)
})

module.exports = loginRouter