export const setLoggedInUser = (userdata) => {
  return {
    type: 'SET_ACTIVE_USER',
    //data: 'Test user'
    data: userdata
  }
}

export const clearLoggedInUser = () => {
  return {
    type: 'CLEAR_ACTIVE_USER'
  }
}

const loggedInUserReducer = ( state = null, action) => {
  switch (action.type){
  case 'SET_ACTIVE_USER':
    return action.data
  case 'CLEAR_ACTIVE_USER':
    return null
  default:
    return state
  }

}

export default loggedInUserReducer