import React from 'react'
//import useState from 'react'
import { Form, Button } from 'react-bootstrap'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '../reducers/loggedInUserReducer'
import fooditemService from '../services/fooditem'
import recipeService from '../services/recipes'


const LoginForm = ({ hideLoginField }) => {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  //const [username, setUsername] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      console.log('user', event.target.formUsername.value)
      console.log('pw', event.target.formPassword.value)
      const userdata = {
        username: event.target.formUsername.value,
        password: event.target.formPassword.value
      }
      const receivedTokenAndUserdata = await loginService.loginUser(userdata)
      console.log('token', receivedTokenAndUserdata)
      dispatch(setLoggedInUser(receivedTokenAndUserdata))
      window.localStorage.setItem('MatappSavedLocalUser', JSON.stringify(receivedTokenAndUserdata))
      fooditemService.setToken(receivedTokenAndUserdata.token)
      recipeService.setToken(receivedTokenAndUserdata.token)
      hideLoginField()
    } catch (error) {
      console.log(error)
    }

    console.log('submitted!')

  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='enter username'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='password'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>login</Button>
    </Form>
  )


}

export default LoginForm