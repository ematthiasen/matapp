const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error('Error handler middleware: error.name:', error.name)
  console.error('Error handler middleware: error.message:', error.message)

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
  errorHandler
}