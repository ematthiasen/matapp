import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import fooditemReducer from './reducers/fooditemReducer'
import recipeReducer from './reducers/recipeReducer'
import activeRecipeReducer from './reducers/activeRecipeReducer'

const reducer = combineReducers({
  fooditems: fooditemReducer,
  recipes: recipeReducer,
  activeRecipe: activeRecipeReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store


