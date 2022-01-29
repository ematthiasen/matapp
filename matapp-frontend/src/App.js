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

function App() {
  const fooditems = useSelector(state => state.fooditems)
  const activeRecipe = useSelector(state => state.activeRecipe)
  const dispatch = useDispatch()

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [user, setUser] = useState(null)

  const logout = () => {
    console.log('logout!')
  }

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
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='light'>
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
            { user
              ? <><Navbar.Text variant='primary'>{user.username} logged in</Navbar.Text><Link to='' onClick={logout}>Logout</Link></>
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
