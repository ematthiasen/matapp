import { setTimeoutHandle } from './timerReducer'

export const createNotification = (messageText, messageType, timeout = 5000) => {
  console.log('creating notification!')
  return async dispatch => {
    await dispatch(setNotification(messageText, messageType))
    await dispatch(setTimeoutHandle(setTimeout( () => {
      dispatch(clearNotification())
    }, timeout )))
  }
}

const setNotification = (messageText, messageType) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      messageText,
      messageType,
    }
  }
}

const clearNotification = () => {
  console.log('clearing!')
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}


const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer