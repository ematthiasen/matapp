const logger = require('./logger')
const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    logger.debug('Authorization string found', authorization)
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)

    if (!decodedToken.id) {
      const error = new Error()
      error.name = 'TokenError'
      error.message = 'Token invalid'
      throw error
    }
    request.user = {
      username: decodedToken.username,
      id: decodedToken.id
    }
    logger.debug('token decoded, user added to request: ', request.user)
  } else {
    logger.debug('No authorization header, anonymous user')
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
  userExtractor
}