/* eslint-disable no-unused-vars */
import React from 'react'
import FooditemForm from './components/FooditemForm'
import IngredientForm from './components/IngredientForm'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import FooditemList from './components/FooditemList'
import LoginForm from './components/LoginForm'
import { useEffect, useState } from 'react'
import './index.css'
import recipeService from './services/recipes'
import fooditemService from './services/fooditem'
import { useSelector, useDispatch } from 'react-redux'
import { initRecipes } from './reducers/recipeReducer'
import { initFooditems } from './reducers/fooditemReducer'
import { Switch, Route, Link, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import { Navbar, Button, Nav } from 'react-bootstrap'
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
  }

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem('MatappSavedLocalUser')
    if(savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON)
      dispatch(setLoggedInUser(savedUser))
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
      <div className='header'><h1>Recipe stuff</h1></div>
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
              ? <><Navbar.Text variant='light'>user {loggedInUser.username} logged in</Navbar.Text><Nav.Link to='' onClick={logout}>Logout</Nav.Link></>
              : <Nav.Link to='' onClick={() => setShowLoginForm(true)}>show Login form</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    /*<>
      <div className='header'><h1>Recipe stuff</h1></div>
      <div className='topnav'><Link to='/'>Home</Link><Link to='/fooditems/'>Fooditems</Link>
        {user
          ? <Link to='/logout/'>{user.username} logged in - logout</Link>
          : <Link to='' onClick={() => setShowLoginForm(true)}>show Login form</Link>
        }</div>
    </>*/
  )

  return (
    <div>
      <Headers />
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
    </div>
  )
}

export default App
