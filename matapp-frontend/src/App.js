/* eslint-disable no-unused-vars */
import React from 'react'
import FooditemForm from './components/FooditemForm'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import FooditemList from './components/FooditemList'
import Notifications from './components/Notifications'
import { useEffect } from 'react'
import recipeService from './services/recipes'
import fooditemService from './services/fooditem'
import { useDispatch } from 'react-redux'
import { initRecipes } from './reducers/recipeReducer'
import { initFooditems } from './reducers/fooditemReducer'
import { Switch, Route } from 'react-router-dom'
import { setLoggedInUser, clearLoggedInUser } from './reducers/loggedInUserReducer'
import { Grid } from '@mui/material'
import HeaderBar from './components/HeaderBar'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'

function App() {

  const dispatch = useDispatch()


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
      },
    }
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <HeaderBar logout={logout} />
        <Notifications />
        <Switch>
          <Route path='/recipe/:id'>
            <Grid container spacing={2} flexWrap='wrap' justifyContent='flex-start' >
              <Recipe  />
            </Grid>
          </Route>
          <Route path='/recipe/'>
            <RecipeList />
          </Route>
          <Route path='/fooditems/create/'>
            <div className='column'>
              <FooditemForm />
            </div>
          </Route>
          <Route path='/fooditems/'>
            <div className='column'>
              <FooditemList />
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
