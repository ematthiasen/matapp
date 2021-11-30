const chalk = require('chalk')
//const level = process.env.LOG_LEVEL || 'info'


/* global process */
const info = (...params) => {
  if (process.env.NODE_ENV === 'test') {
    //console.log(chalk.green('TEST-INFO:'), ...params)
    //No info logging during test, gives error
  } else {
    console.log(chalk.blue('INFO'), ...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV === 'test') {
    console.error(chalk.red('TEST-ERROR:'), ...params)
  } else {
    console.error(chalk.red('ERROR:'), ...params)
  }
}

const debug = (...params) => {
  if (process.env.NODE_ENV === 'test') {
    console.info(chalk.yellow('TEST-DEBUG:'), ...params)
  } else {
    console.info(chalk.yellow('DEBUG:'), ...params)
  }
}

const request = (...params) => {
  if (process.env.NODE_ENV === 'test') {
    console.info(chalk.green('TEST-REQUEST:'), ...params)
  } else {
    console.info(chalk.green('REQUEST:'), ...params)
  }
}

module.exports= {
  info, error, debug, request
}