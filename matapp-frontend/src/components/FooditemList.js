import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFooditem } from '../reducers/fooditemReducer'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { createNotification } from '../reducers/notificationReducer'

const FooditemList = () => {
  const fooditemList = useSelector(state => state.fooditems)
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    const returnvalue = await dispatch(deleteFooditem(id))
    if(returnvalue) {
      console.log('received error: ', returnvalue.message)
      dispatch(createNotification(returnvalue.message, 'error'))
    } else {
      console.log('retrnvalue null, success!')
    }



  }

  return (
    <Container>
      <h2>Fooditems</h2>
      <Row>
        <Col xs lg='2'><b>Name</b></Col><Col align='left'>Protein</Col><Col>Carbs</Col><Col>Fat</Col><Col>Actions</Col>
      </Row>
      {fooditemList.map(fooditem =>
        <Row key={fooditem.id}>
          <Col>{fooditem.name}</Col>
          <Col>{fooditem.protein}</Col>
          <Col>{fooditem.carbohydrate}</Col>
          <Col>{fooditem.fat}</Col>
          <Col><Button onClick={() => handleDelete(fooditem.id)}>Delete</Button></Col>
        </Row>
      )}

      <ul>
        {fooditemList.map(fooditem =>
          <li key={fooditem.id}>{fooditem.name} <button onClick={() => handleDelete(fooditem.id)}>Delete</button>

          </li>
        )}
      </ul>
    </Container>
  )
}

export default FooditemList