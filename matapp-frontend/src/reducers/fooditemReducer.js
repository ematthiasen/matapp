import fooditemService from '../services/fooditem'

export const initFooditems = (fooditemList) => {
  return {
    type: 'INIT_FOODITEMS',
    data: fooditemList
  }
}

export const addFooditem = (fooditem) => {
  return async dispatch => {
    try {
      const createdItem = await fooditemService.createFooditem(fooditem)
      console.log('DB created fooditem: ', createdItem.data)
      await dispatch({
        type: 'ADD_FOODITEM',
        data: createdItem.data
      })
      return null
    }
    catch (error) {
      console.log('testing', error.response.data.error)
      return error
    }
  }
}

export const createFooditem = (fooditem) => {
  return {
    type: 'ADD_FOODITEM',
    data: fooditem
  }
}

export const deleteFooditem = (fooditemId) => {
  return async dispatch => {
    try{
      const deletedItem = await fooditemService.deleteFooditem(fooditemId)
      console.log('Deleted:', deletedItem)
      await dispatch({
        type: 'DELETE_FOODITEM',
        data: fooditemId
      })
      return null
    }
    catch (error) {
      return error
    }

  }
}

const fooditemReducer = (state = [], action) => {
  switch (action.type){
  case 'INIT_FOODITEMS':
    return action.data
  case 'ADD_FOODITEM':
    return state.concat(action.data)
  case 'DELETE_FOODITEM': {
    const newState = state.filter(item => item.id !== action.data)
    return newState
  }
  default:
    return state
  }
}

export default fooditemReducer
