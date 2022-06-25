const logger = require('./logger')

const padNumberToTwoDigits = (number) => {
  return number.toString().padStart(2, '0')
}

const getDate = () => {

  const date = new Date()
  date.setHours(0,0,0,0)

  const dateObject = [ date.getFullYear(), padNumberToTwoDigits(date.getMonth() + 1), padNumberToTwoDigits(date.getDate())]
  logger.info('Date', dateObject.join('-'))
  return dateObject.join('-')
}

const formatDate = (longFormatDate) => {
  const date = new Date(longFormatDate)
  date.setHours(0,0,0,0)
  const dateObject = [ date.getFullYear(), padNumberToTwoDigits(date.getMonth() + 1), padNumberToTwoDigits(date.getDate())]
  logger.info('Date', dateObject.join('-'))
  return dateObject.join('-')
}

module.exports = { getDate, formatDate }