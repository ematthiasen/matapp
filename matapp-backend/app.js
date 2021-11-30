const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const fooditemsRouter = require('./controllers/fooditems')
//const ingredientsRouter = require('./controllers/ingredients')
const recipesRouter = require('./controllers/recipes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const path = require('path')

// DB connection
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(()=> {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

//app.use(express.static('build'))
app.use('/static', express.static(path.join(__dirname, 'build//static')))

app.use('/api/fooditems', fooditemsRouter)

//app.use('/api/ingredients', ingredientsRouter)

app.use('/api/recipes', recipesRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

/*app.get('/', (request, response) => {
  response.send('Hello world!')
})*/
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'build/')})
})

app.use(middleware.errorHandler)

module.exports = app