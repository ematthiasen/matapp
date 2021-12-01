const logger = require('./logger')
const jwt = require('jsonwebtoken')

const userAuthenticator = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    logger.debug('Authorization string found', authorization)
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)

    if (!decodedToken.id) {
      const error = new Error()
      error.name = 'JsonWebTokenError'
      error.message = 'Token invalid'
      throw error
    }
    request.authorizedUser = {
      username: decodedToken.username,
      id: decodedToken.id
    }
    logger.debug('token decoded, user added to request: ', request.authorizedUser)
  } else {
    const error = new Error()
    error.name = 'JsonWebTokenError'
    error.message = 'Token missing or invalid!'
    throw error
  }

  next()
}


const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.request('Method:', request.method)
    logger.request('Path:  ', request.path)
    logger.request('Body:  ', request.body)
    logger.request('---')
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error('Error handler middleware: error.name:', error.name)
  logger.error('Error handler middleware: error.message:', error.message)

  if (error.name === 'SyntaxError') {
    logger.error('SyntaxError: Check JSON formatting?')
    return response.status(400).json({ error: error.message })
  }


  if (error.name === 'AuthenticationError') {
    return response.status(401).json({ error: error.message })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message})
  }

  if (error.name === 'ReferenceError') {
    return response.status(400).json({ error: `Something wrong with the Schema? ${error.message}`})
  }

  console.error('Error handler middleware: error.name:', error.name)
  console.error('Error handler middleware: error.message:', error.message)
  
  next(error)
}


module.exports = 
{
  requestLogger,
  errorHandler,
  userAuthenticator
}