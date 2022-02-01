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
import './index.css'
import recipeService from './services/recipes'
import fooditemService from './services/fooditem'
import { useSelector, useDispatch } from 'react-redux'
import { initRecipes } from './reducers/recipeReducer'
import { initFooditems } from './reducers/fooditemReducer'
import { Switch, Route, Link, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import { Navbar, Button, Nav, Container } from 'react-bootstrap'
import { setLoggedInUser, clearLoggedInUser } from './reducers/loggedInUserReducer'

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

  const Headers = () => (
    <div>
      <Container><h1>Recipe stuff</h1></Container>
      <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
        <Navbar.Toggle aria-controls='navbar' />
        <Navbar.Collapse id='navbar'>
          <Nav className='mr-auto'>
            <Nav.Link href='/' as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link href='/fooditems/' as={Link} to='/fooditems'>
              Fooditems
            </Nav.Link>
          </Nav>
          <Nav>
            { loggedInUser
              ? <><Navbar.Text>user {loggedInUser.username} logged in</Navbar.Text><Nav.Link to='' onClick={logout}>Logout</Nav.Link></>
              : <Nav.Link to='' onClick={() => setShowLoginForm(true)}>show Login form</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

  )

  return (
    <Container>
      <Headers />
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
            <Container>
              <FooditemList />
            </Container>
            <Container>
              <FooditemForm />
            </Container>
          </div>
        </Route>
        <Route path='/'>
          <RecipeList />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
