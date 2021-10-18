/* eslint-disable no-unused-vars */
import React from 'react'
import FooditemForm from './components/FooditemForm'
import IngredientForm from './components/IngredientForm'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import FooditemList from './components/FooditemList'
import { useEffect } from 'react'
import './index.css'
import recipeService from './services/recipes'
import fooditemService from './services/fooditem'
import { useSelector, useDispatch } from 'react-redux'
import { initRecipes } from './reducers/recipeReducer'
import { initFooditems } from './reducers/fooditemReducer'
import { Switch, Route, Link, Redirect, useRouteMatch, useHistory } from 'react-router-dom'


function App() {
  const fooditems = useSelector(state => state.fooditems)
  const activeRecipe = useSelector(state => state.activeRecipe)
  const dispatch = useDispatch()

  useEffect(() => {
    recipeService
      .getAll()
      .then(response => {
        dispatch(initRecipes(response.data))
      })
  }, [dispatch])

  useEffect(() => {
    fooditemService
      .getAll()
      .then(response => {
        dispatch(initFooditems(response.data))
      })
  }, [dispatch])

  const Headers = () => (
    <>
      <div className='header'><h1>Recipe stuff</h1></div>
      <div className='topnav'><Link to='/'>Home</Link><Link to='/fooditems/'>Fooditems</Link></div>
    </>
  )

  return (
    <div>
      <Headers />
      <Switch>
        <Route path='/recipe/:id'>
          <div className='column'>
            <Recipe  />
          </div>
          <div className='column'>
            <IngredientForm />
            <FooditemForm />
          </div>
        </Route>
        <Route path='/recipe/'>
          <RecipeList />
        </Route>
        <Route path='/fooditems/'>
          <FooditemList />
        </Route>
        <Route path='/'>
          <RecipeList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
