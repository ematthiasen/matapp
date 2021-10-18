import fooditemService from '../services/fooditem'

export const initFooditems = (fooditemList) => {
  return {
    type: 'INIT_FOODITEMS',
    data: fooditemList
  }
}

export const addFooditem = (fooditem) => {
  return async dispatch => {
    const createdItem = await fooditemService.createFooditem(fooditem)
    console.log('DB created fooditem: ', createdItem.data)
    await dispatch({
      type: 'ADD_FOODITEM',
      data: createdItem.data
    })
  }
}

const fooditemReducer = (state = [], action) => {
  switch (action.type){
  case 'INIT_FOODITEMS':
    return action.data
  case 'ADD_FOODITEM':
    return state.concat(action.data)
  default:
    return state
  }
}

export default fooditemReducer
