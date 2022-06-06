/* eslint-disable no-unused-vars */
import React from 'react'
import FooditemForm from './components/FooditemForm'
import IngredientForm from './components/IngredientForm'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import FooditemList from './components/FooditemList'
import LoginForm from './components/LoginForm'
import Notifications from './components/Notifications'
import { useEffect, useState } from 'react'
import recipeService from './services/recipes'
import fooditemService from './services/fooditem'
import { useSelector, useDispatch } from 'react-redux'
import { initRecipes } from './reducers/recipeReducer'
import { initFooditems } from './reducers/fooditemReducer'
import { Switch, Route, Link, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import { setLoggedInUser, clearLoggedInUser } from './reducers/loggedInUserReducer'
import { AppBar, Toolbar, IconButton, Container, Typography, Box, Menu, MenuItem, Grid } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import HeaderBar from './components/HeaderBar'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'

function App() {
  const fooditems = useSelector(state => state.fooditems)
  const activeRecipe = useSelector(state => state.activeRecipe)
  const loggedInUser = useSelector(state => state.loggedInUser)
  const dispatch = useDispatch()

  const [showLoginForm, setShowLoginForm] = useState(false)

  const logout = () => {
    console.log('logout!')
    window.localStorage.removeItem('MatappSavedLocalUser')
    dispatch(clearLoggedInUser())
    fooditemService.setToken(null)
    recipeService.setToken(null)
  }

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem('MatappSavedLocalUser')
    if(savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON)
      dispatch(setLoggedInUser(savedUser))
      recipeService.setToken(savedUser.token)
      fooditemService.setToken(savedUser.token)
    }
  }, [])

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

  const theme = createTheme({
    palette: {
      primary: {
        light: '#4c8c4a',
        main: '#1a8145',
        dark: '#003300',
        contrastText: '#ffffff'
      },
      secondary: {
        light: '#8d4887',
        main: '#5e1b5a',
        dark: '#320030',
        contrastText: '#ffffff'
      }
    }
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <HeaderBar logout={logout} showLogin={setShowLoginForm} />
        <Notifications />
        {showLoginForm ?
          <LoginForm hideLoginField={() => setShowLoginForm(false)}/> :
          <></>
        }
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
            <div className='column'>
              <FooditemList />
              <FooditemForm />
            </div>
          </Route>
          <Route path='/'>
            <RecipeList />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
