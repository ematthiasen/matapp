export const setTimeoutHandle = (timeoutHandle) => {
  return {
    type: 'SET_TIMER',
    data: {
      timeoutHandle
    }
  }
}

const timerReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_TIMER': {
    window.clearTimeout(state)
    return action.data.timeoutHandle
  }
  case 'CLEAR_TIMER':
    clearTimeout(state)
    return null
  default:
    return state
  }
}

export default timerReducer