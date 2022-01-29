import React from 'react'
//import useState from 'react'
import { Form, Button } from 'react-bootstrap'
const LoginForm = ({ hideLoginField }) => {

  // eslint-disable-next-line no-unused-vars
  //const [username, setUsername] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('submitted!')
    hideLoginField()
  }

  return(
    <Form onSubmit={onSubmit}>
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